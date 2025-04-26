import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from '../../exported';
import { UsersEntity } from '../users/users.entity';
import { ExtendedUsersEntity } from '../users/users.interface';

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

    it('should have correct decorators', () => {
      const isPublic = Reflect.getMetadata(
        IS_PUBLIC_KEY,
        controller.signIn, // Важно: передаем сам метод
      );
      expect(isPublic).toBe(true);

      const postPath = Reflect.getMetadata('path', controller.signIn);
      expect(postPath).toBe('login');

      const httpCode = Reflect.getMetadata('__httpCode__', controller.signIn);
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

    it('should have correct ApiBody decorator', () => {
      const apiBodyMetadata = Reflect.getMetadata(
        'swagger/apiParameters',
        AuthController.prototype.register,
      );

      expect(apiBodyMetadata).toBeDefined();
      expect(apiBodyMetadata[0].schema).toEqual({
        type: 'object',
        properties: {
          username: expect.anything(),
          password: expect.anything(),
          repeatPassword: expect.anything(),
          inviteCode: expect.anything(),
          email: expect.anything(),
        },
        required: [
          'username',
          'password',
          'repeatPassword',
          'inviteCode',
          'email',
        ],
      });
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
