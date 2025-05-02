import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthGuard } from '../../modules/auth/auth.guard';

type ModuleSpecConfig = {
  controller: any;
  service: any;
  module: any;
  entity: any;
};

export function createModuleSpec<Controller, Service>(
  config: ModuleSpecConfig,
) {
  let module: TestingModule;
  let controller: Controller;
  let service: Service;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [config.module],
    })
      .overrideProvider(getRepositoryToken(config.entity))
      .useValue(mockRepository)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    service = module.get<Service>(config.service);
    controller = module.get<Controller>(config.controller);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide service', () => {
    expect(service).toBeInstanceOf(config.service);
  });

  it('should include controller', () => {
    expect(controller).toBeInstanceOf(config.controller);
  });
}
