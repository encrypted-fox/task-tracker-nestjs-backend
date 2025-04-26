import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

const mockExecutionContext = (headers: Record<string, string>) => ({
  switchToHttp: () => ({
    getRequest: () => ({
      headers,
    }),
  }),
  getHandler: () => jest.fn(),
  getClass: () => jest.fn(),
});

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let reflector: Reflector;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    reflector = module.get<Reflector>(Reflector);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('Public routes', () => {
    it('should allow access for public routes', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const context = {
        getHandler: () => jest.fn(),
        getClass: () => jest.fn(),
      } as unknown as ExecutionContext;

      expect(await guard.canActivate(context)).toBe(true);
    });
  });

  describe('Protected routes', () => {
    beforeEach(() => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    });

    it('should throw UnauthorizedException if no token provided', async () => {
      const context = mockExecutionContext({}) as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      jwtService.verifyAsync = jest.fn().mockRejectedValue(new Error());
      const context = mockExecutionContext({
        authorization: 'Bearer invalid_token',
      }) as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should set user in request for valid token', async () => {
      const mockUser = { id: 1, username: 'test' };
      const mockRequest = {
        headers: {
          authorization: 'Bearer valid_token',
        },
        user: null,
      };

      const context: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
        getHandler: () => jest.fn(),
        getClass: () => jest.fn(),
      } as unknown as ExecutionContext;

      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockUser);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

      await guard.canActivate(context);

      expect(mockRequest.user).toEqual(mockUser);
      expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid_token', {
        secret: process.env.JWT_SECRET,
      });
    });

    it('should handle token verification errors', async () => {
      jwtService.verifyAsync = jest.fn().mockImplementation(() => {
        throw new Error('Token expired');
      });

      const context = mockExecutionContext({
        authorization: 'Bearer expired_token',
      }) as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('Token extraction', () => {
    it('should correctly extract token from header', () => {
      const context = mockExecutionContext({
        authorization: 'Bearer valid_token',
      }) as unknown as ExecutionContext;

      const request = context.switchToHttp().getRequest();
      expect(request.headers.authorization).toBe('Bearer valid_token');
    });

    it('should handle malformed authorization header', async () => {
      const context = mockExecutionContext({
        authorization: 'InvalidHeader',
      }) as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
