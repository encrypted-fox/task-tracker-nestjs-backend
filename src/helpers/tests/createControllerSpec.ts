import { Test, TestingModule } from '@nestjs/testing';

import { HttpStatus } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { PermissionsGuard } from '../../modules/permissions/permissions.guard';
import { PERMISSIONS_KEY } from '../../modules/permissions/permissions.decorator';

import { I18nContext } from 'nestjs-i18n';
import { Reflector } from '@nestjs/core';

import { BaseQueryParams } from '../base/BaseController';
import { LOG_ACTION_KEY } from '../../modules/logs/logs.decorator';
import {
  // GUARDS_METADATA,
  HTTP_CODE_METADATA,
  PATH_METADATA,
} from '@nestjs/common/constants';

type ControllerSpecConfig<T extends { [K in keyof T]: any }> = {
  controller: new (...args: any[]) => T;
  service: any;
  entity: any;
  entityName: string;
};

export function createControllerSpec<
  T extends {
    getList: (...args: any[]) => Promise<any>;
    getAll: (...args: any[]) => Promise<any>;
    get: (id: number) => Promise<any>;
    create: (entity: any) => Promise<any>;
    update: (id: number, entity: any) => Promise<any>;
    delete: (id: number) => Promise<void>;
  },
>(config: ControllerSpecConfig<T>) {
  let controller: T;

  const mockService = {
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
      controllers: [config.controller],
      providers: [
        Reflector,
        {
          provide: config.service,
          useValue: mockService,
        },
        {
          provide: JwtService, // Добавляем провайдер для JwtService
          useValue: mockJwtService,
        },
        { provide: PermissionsGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();

    controller = module.get<T>(config.controller);
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

      jest
        .spyOn(
          controller as unknown as {
            getList: (...args: any[]) => Promise<any>;
          },
          'getList',
        )
        .mockResolvedValue(expectedResult);

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
      expect(permissionDecorator).toContain(`${config.entityName}:get:list`);
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

      jest
        .spyOn(
          controller as unknown as {
            getAll: (...args: any[]) => Promise<any>;
          },
          'getAll',
        )
        .mockResolvedValue(expectedResult);

      const result = await controller.getAll(mockQueryParams);

      expect(result).toEqual(expectedResult);
      expect(controller.getAll).toHaveBeenCalledWith(mockQueryParams);
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.getAll,
      );
      expect(permissionDecorator).toContain(`${config.entityName}:get:all`);
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
      const expectedResult = new config.entity();

      jest
        .spyOn(
          controller as unknown as { get: (...args: any[]) => Promise<any> },
          'get',
        )
        .mockResolvedValue(expectedResult);

      const result = await controller.get(mockId);

      expect(result).toEqual(expectedResult);
      expect(controller.get).toHaveBeenCalledWith(mockId);
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.get,
      );
      expect(permissionDecorator).toContain(`${config.entityName}:get:one`);
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
      const mockItem = new config.entity();
      const expectedResult = new config.entity();

      jest
        .spyOn(
          controller as unknown as {
            create: (...args: any[]) => Promise<any>;
          },
          'create',
        )
        .mockResolvedValue(expectedResult);

      const result = await controller.create(mockItem);

      expect(result).toEqual(expectedResult);
      expect(controller.create).toHaveBeenCalledWith(mockItem);
    });

    it('should have correct log', () => {
      const logAction = Reflect.getMetadata(LOG_ACTION_KEY, controller.create);
      expect(logAction).toEqual({
        entity: config.entityName,
        action: 'CREATE',
      });
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.create,
      );
      expect(permissionDecorator).toContain(`${config.entityName}:create`);
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
    it('should call super.update with correct parameters', async () => {
      const mockId = 1;
      const mockEntity = new config.entity();
      const expectedResult = new config.entity();

      jest
        .spyOn(
          controller as unknown as {
            update: (...args: any[]) => Promise<any>;
          },
          'update',
        )
        .mockResolvedValue(expectedResult);

      const result = await controller.update(mockId, mockEntity);

      expect(result).toEqual(expectedResult);
      expect(controller.update).toHaveBeenCalledWith(mockId, mockEntity);
    });

    it('should have correct log', () => {
      const logAction = Reflect.getMetadata(LOG_ACTION_KEY, controller.update);
      expect(logAction).toEqual({
        entity: config.entityName,
        action: 'UPDATE',
      });
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.update,
      );
      expect(permissionDecorator).toContain(`${config.entityName}:update`);
    });

    it('should have /:id path', () => {
      const path = Reflect.getMetadata(PATH_METADATA, controller.update);
      expect(path).toBe(':id');
    });

    it('should have OK response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.update,
      );
      expect(httpCode).toBe(HttpStatus.OK);
    });
  });

  describe('delete', () => {
    it('should call super.delete with correct id', async () => {
      const mockId = 1;

      jest
        .spyOn(
          controller as unknown as {
            delete: (...args: any[]) => Promise<any>;
          },
          'delete',
        )
        .mockResolvedValue(undefined);

      await controller.delete(mockId);

      expect(controller.delete).toHaveBeenCalledWith(mockId);
    });

    it('should have correct log', () => {
      const logAction = Reflect.getMetadata(LOG_ACTION_KEY, controller.delete);
      expect(logAction).toEqual({
        entity: config.entityName,
        action: 'DELETE',
      });
    });

    it('should have RequirePermission with correct permission option', () => {
      const permissionDecorator = Reflect.getMetadata(
        PERMISSIONS_KEY,
        controller.delete,
      );
      expect(permissionDecorator).toContain(`${config.entityName}:delete`);
    });

    it('should have /:id path', () => {
      const path = Reflect.getMetadata(PATH_METADATA, controller.delete);
      expect(path).toBe(':id');
    });

    it('should have OK response code', () => {
      const httpCode = Reflect.getMetadata(
        HTTP_CODE_METADATA,
        controller.delete,
      );
      expect(httpCode).toBe(HttpStatus.OK);
    });
  });
}
