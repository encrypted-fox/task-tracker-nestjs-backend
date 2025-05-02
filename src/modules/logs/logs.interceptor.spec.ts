import { Test } from '@nestjs/testing';
import { LogsInterceptor } from './logs.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LogsService } from './logs.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { delay, of } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { UsersEntity } from '../users/users.entity';

describe('LogsInterceptor', () => {
  let interceptor: LogsInterceptor;
  let mockReflector: jest.Mocked<Reflector>;
  let mockLogsService: jest.Mocked<LogsService>;
  let mockJwtService: jest.Mocked<JwtService>;
  let mockUsersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LogsInterceptor,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: LogsService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 1, username: 'test' }),
          },
        },
      ],
    }).compile();

    interceptor = module.get<LogsInterceptor>(LogsInterceptor);
    mockReflector = module.get(Reflector);
    mockLogsService = module.get(LogsService);
    mockJwtService = module.get(JwtService);
    mockUsersService = module.get(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('when decorator is not set', () => {
    it('should not create log', async () => {
      mockReflector.get.mockReturnValue(undefined);
      const context = createMockContext();
      const handler = createMockHandler();

      await lastValueFrom(interceptor.intercept(context, handler));

      expect(mockLogsService.create).not.toHaveBeenCalled();
    });
  });

  describe('when decorator is set', () => {
    const mockOptions = { entity: 'test', action: 'CREATE' };
    const mockUser = { id: 1, username: 'test' } as UsersEntity;

    beforeEach(() => {
      mockReflector.get.mockReturnValue(mockOptions);
      mockJwtService.verifyAsync.mockResolvedValue({ id: mockUser.id });
      mockUsersService.findOne.mockResolvedValue(mockUser);
    });

    it('should create log with correct parameters', async () => {
      mockReflector.get.mockReturnValue({
        entity: 'test',
        action: 'CREATE',
      });

      const context = createMockContext({
        method: 'POST',
        url: '/test',
        body: { name: 'test' },
        params: { id: 123 },
        headers: { authorization: 'Bearer valid-token' },
      });

      const handler = createMockHandler({ id: 123 });

      await lastValueFrom(
        interceptor.intercept(context, handler).pipe(delay(0)),
      );

      expect(mockLogsService.create).toHaveBeenCalledWith({
        path: '/test',
        action: 'CREATE',
        entity: 'test',
        object: {
          id: 123,
          body: { name: 'test' },
          params: { id: 123 },
        },
        creator: { id: 1, username: 'test' },
      });
    });
  });

  describe('error handling', () => {
    it('should not break request flow on log error', async () => {
      mockReflector.get.mockReturnValue({ entity: 'test', action: 'CREATE' });
      mockLogsService.create.mockRejectedValue(new Error('Log error'));

      const context = createMockContext();
      const handler = createMockHandler({ id: 1 });

      await expect(
        lastValueFrom(interceptor.intercept(context, handler)),
      ).resolves.toEqual({ id: 1 });
    });

    it('should handle invalid token', async () => {
      mockReflector.get.mockReturnValue({ entity: 'test', action: 'CREATE' });
      mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

      const context = createMockContext({
        headers: { authorization: 'Bearer invalid' },
      });
      const handler = createMockHandler();

      await expect(
        lastValueFrom(interceptor.intercept(context, handler)),
      ).resolves.toBeDefined();
    });
  });
});

function createMockContext(requestOverrides: any = {}): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        method: 'POST',
        url: '/test',
        body: { name: 'test' },
        params: { id: 123 },
        headers: { authorization: 'Bearer valid-token' },
        ...requestOverrides,
      }),
    }),
    getHandler: () => () => {},
  } as unknown as ExecutionContext;
}

function createMockHandler(result: any = {}): CallHandler {
  return {
    handle: () => of(result),
  };
}
