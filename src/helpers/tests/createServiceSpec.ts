import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

type ServiceSpecConfig<Service, Entity> = {
  service: new (...args: any[]) => Service;
  entity: new () => Entity;
  relations: Record<string, boolean>;
  searchFields: string[];
};

jest.mock('../../base/BaseService', () => {
  const mockBaseService = {};

  return {
    BaseService: jest.fn().mockImplementation(() => mockBaseService),
  };
});

export function createServiceSpec<Service, Entity>(
  config: ServiceSpecConfig<Service, Entity>,
) {
  let service: Service;
  let mockRepository: Repository<Entity>;

  const MockBaseService = jest.requireMock(
    '../../base/BaseService',
  ).BaseService;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockRepository = {} as Repository<Entity>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        config.service,
        {
          provide: getRepositoryToken(config.entity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<Service>(config.service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize BaseService with correct parameters', () => {
    expect(MockBaseService).toHaveBeenCalledWith(
      mockRepository,
      config.searchFields,
      config.relations,
    );
  });
}
