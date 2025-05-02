import { Test } from '@nestjs/testing';
import { BaseService } from './BaseService';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from 'typeorm';

describe('BaseService', () => {
  let service: BaseService<any>;
  let repository: jest.Mocked<Repository<any>>;
  const mockEntity = { id: 1, name: 'Test' };
  const searchFields = ['name', 'description'];
  const relations = { user: true };

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      metadata: {
        propertiesMap: {},
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        BaseService,
        {
          provide: getRepositoryToken(Object),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BaseService<any>>(BaseService);
    repository = module.get(getRepositoryToken(Object)) as jest.Mocked<
      Repository<any>
    >;

    (service as any).repository = repository;
    (service as any).searchFields = searchFields;
    (service as any).relations = relations;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should build basic query without filters', async () => {
      repository.find.mockResolvedValue([mockEntity]);

      const result = await service.find({});

      expect(repository.find).toHaveBeenCalledWith({
        relations,
        where: {},
        order: { id: 'DESC' },
        skip: 0,
        take: 20,
        cache: true,
      });
      expect(result).toEqual([mockEntity]);
    });

    it('should build search query with OR conditions', async () => {
      const query = 'test';
      repository.find.mockResolvedValue([mockEntity]);

      await service.find({}, {}, query);

      expect(repository.find).toHaveBeenCalledWith({
        relations,
        where: [
          { name: Like(`%${query}%`) },
          { description: Like(`%${query}%`) },
        ],
        order: { id: 'DESC' },
        skip: 0,
        take: 20,
        cache: true,
      });
    });

    it('should combine filters and search query', async () => {
      const query = 'test';
      const filters = { active: true };

      await service.find({}, filters, query);

      expect(repository.find).toHaveBeenCalledWith({
        relations,
        where: [
          { ...filters, name: Like(`%${query}%`) },
          { ...filters, description: Like(`%${query}%`) },
        ],
        order: { id: 'DESC' },
        skip: 0,
        take: 20,
        cache: true,
      });
    });
  });

  describe('findOne', () => {
    it('should return first item from find results', async () => {
      repository.find.mockResolvedValue([mockEntity]);
      const result = await service.findOne({});
      expect(result).toEqual(mockEntity);
    });

    it('should return null for empty results', async () => {
      repository.find.mockResolvedValue([]);
      const result = await service.findOne({});
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and save new entity', async () => {
      const newItem = { name: 'New Item' };
      const createdItem = {
        ...newItem,
        id: 2,
        createdAt: new Date().toISOString(),
      };

      repository.create.mockReturnValue(createdItem);
      repository.save.mockResolvedValue(createdItem);
      repository.findOne.mockResolvedValue(createdItem);

      const result = await service.create(newItem);

      expect(repository.create).toHaveBeenCalledWith({
        ...newItem,
        createdAt: expect.any(String),
      });
      expect(repository.save).toHaveBeenCalledWith(createdItem);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 2 },
        relations,
      });
      expect(result).toEqual(createdItem);
    });
  });

  describe('update', () => {
    it('should update entity and return updated version', async () => {
      const updatedItem = { name: 'Updated', id: 1 };
      const updatedEntity = {
        ...updatedItem,
        updatedAt: new Date().toISOString(),
      };

      repository.update.mockResolvedValue(null);
      repository.findOne.mockResolvedValue(updatedEntity);

      const result = await service.update(1, updatedItem);

      expect(repository.update).toHaveBeenCalledWith(
        { id: 1 },
        {
          ...updatedItem,
          updatedAt: expect.any(String),
        },
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations,
      });
      expect(result).toEqual(updatedEntity);
    });
  });

  describe('remove', () => {
    it('should set deletedAt and updatedAt', async () => {
      await service.remove(1);

      expect(repository.update).toHaveBeenCalledWith(
        { id: 1 },
        {
          deletedAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      );
    });
  });
});
