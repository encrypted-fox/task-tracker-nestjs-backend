import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from '../../helpers/decorators/PublicDecorator';
import { UsersEntity } from '../users/users.entity';
import { ExtendedUsersEntity } from '../users/users.interface';
import { HTTP_CODE_METADATA, PATH_METADATA } from '@nestjs/common/constants';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
    registerByInvite: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should call authService.signIn with correct parameters', async () => {
      const mockUser = { username: 'test', password: 'pass' } as UsersEntity;
      const expectedResult = {
        ...mockUser,
        token: 'jwt',
      } as ExtendedUsersEntity;

      mockAuthService.signIn.mockResolvedValue(expectedResult);

      const result = await controller.signIn(mockUser);

      expect(authService.signIn).toHaveBeenCalledWith(
        mockUser.username,
        mockUser.password,
      );
      expect(result).toEqual(expectedResult);
    });

    it('should be public', () => {
      const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, controller.signIn);
      expect(isPublic).toBe(true);
    });

    it('should have /login path', () => {
      const postPath = Reflect.getMetadata(PATH_METADATA, controller.signIn);
      expect(postPath).toBe('login');
    });

    it('should have OK response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.signIn,
      );
      expect(httpCode).toBe(HttpStatus.OK);
    });
  });

  describe('register', () => {
    const validRequest = {
      username: 'newUser',
      password: 'P@ssw0rd!',
      repeatPassword: 'P@ssw0rd!',
      inviteCode: 'INVITE123',
      email: 'user@example.com',
    };

    const invalidRequest = {
      ...validRequest,
      repeatPassword: 'different',
    };

    it('should call registerByInvite when passwords match', async () => {
      const expectedResult = {
        ...validRequest,
        token: 'jwt',
      } as ExtendedUsersEntity;

      mockAuthService.registerByInvite.mockResolvedValue(expectedResult);

      const result = await controller.register(validRequest);

      expect(authService.registerByInvite).toHaveBeenCalledWith(
        validRequest.username,
        validRequest.password,
        validRequest.email,
        validRequest.inviteCode,
      );
      expect(result).toEqual(expectedResult);
    });

    it('should return undefined when passwords dont match', async () => {
      const result = await controller.register(invalidRequest);
      expect(result).toBeUndefined();
      expect(authService.registerByInvite).not.toHaveBeenCalled();
    });

    it('should be public', () => {
      const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, controller.register);
      expect(isPublic).toBe(true);
    });

    it('should have /register path', () => {
      const postPath = Reflect.getMetadata(PATH_METADATA, controller.register);
      expect(postPath).toBe('register');
    });

    it('should have CREATED response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.register,
      );
      expect(httpCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('Error Handling', () => {
    it('should throw error when service throws', async () => {
      const mockUser = { username: 'test', password: 'wrong' } as UsersEntity;
      mockAuthService.signIn.mockRejectedValue(new Error('Auth failed'));

      await expect(controller.signIn(mockUser)).rejects.toThrow('Auth failed');
    });
  });
});
