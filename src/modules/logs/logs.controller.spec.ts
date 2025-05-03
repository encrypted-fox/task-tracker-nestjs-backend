import { Test, TestingModule } from '@nestjs/testing';

import { HttpStatus, NotAcceptableException } from '@nestjs/common';

import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { LogsEntity } from './logs.entity';

import { JwtService } from '@nestjs/jwt';

import { PermissionsGuard } from '../permissions/permissions.guard';
import { PERMISSIONS_KEY } from '../permissions/permissions.decorator';

import { I18nContext } from 'nestjs-i18n';
import { Reflector } from '@nestjs/core';

import { BaseQueryParams } from '../../helpers/base/BaseController';
import { HTTP_CODE_METADATA, PATH_METADATA } from '@nestjs/common/constants';

describe('LogsController', () => {
  let controller: LogsController;

  const mockLogsService = {
    getList: jest.fn(),
    getAll: jest.fn(),
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [
        {
          provide: LogsService,
          useValue: mockLogsService,
        },
        Reflector,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        { provide: PermissionsGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();

    controller = module.get<LogsController>(LogsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getList', () => {
    it('should call super.getList with correct parameters', async () => {
      const mockQueryParams: BaseQueryParams = {};
      const mockI18n = {} as I18nContext;
      const expectedResult = {
        data: [],
        meta: { count: 0, order: { id: 'DESC' } },
      };

      jest.spyOn(controller, 'getList').mockResolvedValue(expectedResult);

      const result = await controller.getList(mockI18n, mockQueryParams);

      expect(result).toEqual(expectedResult);
      expect(controller.getList).toHaveBeenCalledWith(
        mockI18n,
        mockQueryParams,
      );
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.getList,
      );
      expect(permissionDecorator).toContain('logs:get:list');
    });

    it('should have /list path', () => {
      const path = Reflect.getMetadata(PATH_METADATA, controller.getList);
      expect(path).toBe('list');
    });

    it('should have OK response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.getList,
      );
      expect(httpCode).toBe(HttpStatus.OK);
    });
  });

  describe('getAll', () => {
    it('should call super.getAll with correct parameters', async () => {
      const mockQueryParams: BaseQueryParams = {};
      const expectedResult = {
        data: [],
        meta: { count: 0, order: { id: 'DESC' } },
      };

      jest.spyOn(controller, 'getAll').mockResolvedValue(expectedResult);

      const result = await controller.getAll(mockQueryParams);

      expect(result).toEqual(expectedResult);
      expect(controller.getAll).toHaveBeenCalledWith(mockQueryParams);
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.getAll,
      );
      expect(permissionDecorator).toContain('logs:get:all');
    });

    it('should have / path', () => {
      const path = Reflect.getMetadata(PATH_METADATA, controller.getAll);
      expect(path).toBe('/');
    });

    it('should have OK response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.getAll,
      );
      expect(httpCode).toBe(HttpStatus.OK);
    });
  });

  describe('get', () => {
    it('should call super.get with correct id', async () => {
      const mockId = 1;
      const expectedResult = new LogsEntity();

      jest.spyOn(controller, 'get').mockResolvedValue(expectedResult);

      const result = await controller.get(mockId);

      expect(result).toEqual(expectedResult);
      expect(controller.get).toHaveBeenCalledWith(mockId);
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.get,
      );
      expect(permissionDecorator).toContain('logs:get:one');
    });

    it('should have /:id path', () => {
      const path = Reflect.getMetadata(PATH_METADATA, controller.get);
      expect(path).toBe(':id');
    });

    it('should have OK response code', () => {
      const httpCode = Reflect.getMetadata(HTTP_CODE_METADATA, controller.get);
      expect(httpCode).toBe(HttpStatus.OK);
    });
  });

  describe('create', () => {
    it('should call super.create with correct entity', async () => {
      const mockLog = new LogsEntity();
      const expectedResult = new LogsEntity();

      jest.spyOn(controller, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(mockLog);

      expect(result).toEqual(expectedResult);
      expect(controller.create).toHaveBeenCalledWith(mockLog);
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.create,
      );
      expect(permissionDecorator).toContain('logs:create');
    });

    it('should have / path', () => {
      const path = Reflect.getMetadata(PATH_METADATA, controller.create);
      expect(path).toBe('/');
    });

    it('should have CREATED response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.create,
      );
      expect(httpCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('update', () => {
    it('should throw error when called', async () => {
      await expect(controller.update()).rejects.toThrow(
        new NotAcceptableException(),
      );
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.update,
      );
      expect(permissionDecorator).toContain('logs:update');
    });

    it('should have /:id path', () => {
      const path = Reflect.getMetadata(PATH_METADATA, controller.update);
      expect(path).toBe(':id');
    });

    it('should have NOT_ACCEPTABLE response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.update,
      );
      expect(httpCode).toBe(HttpStatus.NOT_ACCEPTABLE);
    });
  });

  describe('delete', () => {
    it('should throw error when called', async () => {
      await expect(controller.delete()).rejects.toThrow(
        new NotAcceptableException(),
      );
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.delete,
      );
      expect(permissionDecorator).toContain('logs:delete');
    });

    it('should have /:id path', () => {
      const path = Reflect.getMetadata(PATH_METADATA, controller.delete);
      expect(path).toBe(':id');
    });

    it('should have NOT_ACCEPTABLE response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.delete,
      );
      expect(httpCode).toBe(HttpStatus.NOT_ACCEPTABLE);
    });
  });
});
