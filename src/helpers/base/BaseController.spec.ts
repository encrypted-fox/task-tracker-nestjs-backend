import { I18nContext } from 'nestjs-i18n';
import { BaseController } from './BaseController';
import { BaseService } from './BaseService';

describe('BaseController', () => {
  let controller: BaseController<any, any>;
  let mockService: jest.Mocked<BaseService<any>>;
  const mockI18n = {
    t: jest.fn((key: string) => `${key}_translated`), // Мок перевода
    lang: 'en',
  } as unknown as I18nContext;
  const mockFields = ['id', 'title'];
  const mockEntity = { id: 1, title: 'Test' };

  beforeEach(async () => {
    mockService = {
      find: jest.fn().mockResolvedValue([mockEntity]),
      findOne: jest.fn().mockResolvedValue(mockEntity),
      create: jest.fn().mockResolvedValue(mockEntity),
      update: jest.fn().mockResolvedValue(mockEntity),
      remove: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<BaseService<any>>;

    controller = new BaseController(mockFields, mockService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getList', () => {
    it('should return formatted response with i18n', async () => {
      const queryParams = {
        skip: 0,
        take: 20,
        order: { name: 'ASC' },
      };

      const result = await controller.getList(mockI18n, queryParams);

      expect(mockService.find).toHaveBeenCalledWith(
        {},
        undefined,
        undefined,
        0,
        20,
        { name: 'ASC' },
      );

      expect(result).toEqual({
        header: expect.any(Object),
        table: expect.any(Object),
        data: expect.any(Object),
        meta: {
          count: 1,
          skip: 0,
          take: 20,
          order: { name: 'ASC' },
        },
      });
    });
  });

  describe('getAll', () => {
    it('should return entities without formatting', async () => {
      const queryParams = {
        filters: { active: true },
        skip: 10,
        take: 5,
      };

      const result = await controller.getAll(queryParams);

      expect(mockService.find).toHaveBeenCalledWith(
        {},
        { active: true },
        undefined,
        10,
        5,
        undefined,
      );

      expect(result).toEqual({
        data: [mockEntity],
        meta: {
          count: 1,
          skip: 10,
          take: 5,
          order: { id: 'DESC' },
        },
      });
    });
  });

  describe('get', () => {
    it('should return single entity by id', async () => {
      const result = await controller.get(1);

      expect(mockService.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockEntity);
    });
  });

  describe('create', () => {
    it('should create new entity', async () => {
      const result = await controller.create(mockEntity);

      expect(mockService.create).toHaveBeenCalledWith(mockEntity);
      expect(result).toEqual(mockEntity);
    });
  });

  describe('update', () => {
    it('should update existing entity', async () => {
      const updatedEntity = { ...mockEntity, name: 'Updated' };
      mockService.update.mockResolvedValue(updatedEntity);

      const result = await controller.update(1, updatedEntity);

      expect(mockService.update).toHaveBeenCalledWith(1, updatedEntity);
      expect(result).toEqual(updatedEntity);
    });
  });

  describe('delete', () => {
    it('should remove entity by id', async () => {
      await controller.delete(1);

      expect(mockService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('generators', () => {
    it('should generate header from fields', () => {
      const header = controller.generateHeader(mockI18n, mockFields);

      expect(header).toBeInstanceOf(Array);
      expect(header).toHaveLength(2);
      expect(header[0].name).toBe('id');
      expect(header[1].name).toBe('title');
    });

    it('should generate table structure', () => {
      const table = controller.generateTable(mockFields);

      expect(table).toEqual({
        id: expect.any(Object),
        title: expect.any(Object),
      });
      expect(Object.keys(table)).toHaveLength(2);
    });

    it('should generate data structure', () => {
      const data = controller.generateData([mockEntity], mockFields);

      expect(data).toBeInstanceOf(Array);
      expect(data[0]).toEqual({
        id: { label: '#1' },
        title: { label: 'Test' },
      });
    });
  });
});
