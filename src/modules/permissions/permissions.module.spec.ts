import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PermissionsModule } from './permissions.module';
import { PermissionsEntity } from './permissions.entity';
import { DataSource } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PermissionsService } from './permissions.service';

describe('PermissionsModule', () => {
  let module: TestingModule;

  const mockPermissionsRepository = {
    find: jest.fn(),
    save: jest.fn(),
  };

  const mockDataSource = {
    createEntityManager: jest.fn(),
    transaction: jest.fn(),
    getRepository: jest.fn().mockReturnValue(mockPermissionsRepository),
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        PermissionsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          entities: [PermissionsEntity],
          synchronize: true,
        }),
        JwtModule.register({ secret: 'test' }),
      ],
    })
      .overrideProvider(getRepositoryToken(PermissionsEntity))
      .useValue(mockPermissionsRepository)
      .overrideProvider(DataSource)
      .useValue(mockDataSource)
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide PermissionsService', () => {
    const service = module.get(PermissionsService);
    expect(service).toBeInstanceOf(PermissionsService);
  });

  afterAll(async () => {
    await module.close();
  });
});
