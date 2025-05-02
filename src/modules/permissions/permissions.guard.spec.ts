// src/auth/guards/permissions.guard.spec.ts
import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import {
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';
import { PermissionsService } from './permissions.service';

const mockExecutionContext = (headers: Record<string, string>, user?: any) => ({
  switchToHttp: () => ({
    getRequest: () => ({
      headers,
      user: user || null,
    }),
  }),
  getHandler: () => jest.fn(),
  getClass: () => jest.fn(),
});

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let reflector: Reflector;
  let jwtService: JwtService;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PermissionsGuard,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: PermissionsService,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<PermissionsGuard>(PermissionsGuard);
    reflector = module.get<Reflector>(Reflector);
    jwtService = module.get<JwtService>(JwtService);
    permissionsService = module.get<PermissionsService>(PermissionsService);
  });

  describe('No required permissions', () => {
    it('should allow access when no permissions required', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue(undefined);

      const context = mockExecutionContext({
        authorization: 'Bearer valid_token',
      }) as unknown as ExecutionContext;
      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  describe('With required permissions', () => {
    const requiredPermissions = ['users:getAll', 'posts:update'];
    const mockUser = { role: { id: 1 } };

    beforeEach(() => {
      jest.spyOn(reflector, 'get').mockReturnValue(requiredPermissions);
      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockUser);
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

    it('should throw ForbiddenException if user has no role', async () => {
      jwtService.verifyAsync = jest.fn().mockResolvedValue({});
      const context = mockExecutionContext({
        authorization: 'Bearer valid_token',
      }) as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException if missing permissions', async () => {
      const requiredPermissions = ['users:getAll', 'posts:update'];
      const mockUser = {
        role: { id: 1, name: 'admin' },
        id: 1,
        email: 'test@example.com',
      };

      jest.spyOn(reflector, 'get').mockReturnValue(requiredPermissions);
      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockUser);
      permissionsService.find = jest.fn().mockResolvedValue([
        { title: 'users:getAll', value: true },
        { title: 'posts:update', value: false },
      ]);

      const context = mockExecutionContext(
        { authorization: 'Bearer valid_token' },
        mockUser,
      ) as unknown as ExecutionContext;

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
      expect(permissionsService.find).toHaveBeenCalled();
      expect(permissionsService.find).toHaveBeenCalledWith({ role: 1 });
    });

    it('should allow access with valid permissions', async () => {
      permissionsService.find = jest.fn().mockResolvedValue([
        { title: 'users:getAll', value: true },
        { title: 'posts:update', value: true },
      ]);

      const context = mockExecutionContext(
        { authorization: 'Bearer valid_token' },
        mockUser,
      ) as unknown as ExecutionContext;
      const result = await guard.canActivate(context);

      expect(result).toBe(true);
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

  describe('Token verification', () => {
    it('should set user in request after verification', async () => {
      const mockUser = { id: 1, role: { id: 2 } };
      const mockRequest = {
        headers: { authorization: 'Bearer valid_token' },
        user: null,
      };

      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockUser);
      jest.spyOn(reflector, 'get').mockReturnValue([]);
      permissionsService.find = jest.fn().mockResolvedValue([]);

      const context: ExecutionContext = {
        switchToHttp: () => ({ getRequest: () => mockRequest }),
        getHandler: () => jest.fn(),
        getClass: () => jest.fn(),
      } as unknown as ExecutionContext;

      await guard.canActivate(context);
      expect(mockRequest.user).toEqual(mockUser);
    });
  });
});
