import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LogsModule } from './logs.module';
import { LogsService } from './logs.service';
import { UsersModule } from '../users/users.module';
import { LogsEntity } from './logs.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

const mockRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('LogsModule', () => {
  let logsService: LogsService;
  let logsRepository: Repository<LogsEntity>;

  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        LogsModule,
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '60s' },
        }),
        UsersModule,
      ],
    })
      .overrideProvider(getRepositoryToken(UsersEntity))
      .useValue({
        find: jest.fn(),
        save: jest.fn(),
      })
      .overrideProvider(getRepositoryToken(LogsEntity))
      .useFactory({ factory: mockRepository })
      .compile();

    logsService = module.get<LogsService>(LogsService);
    logsRepository = module.get<Repository<LogsEntity>>(
      getRepositoryToken(LogsEntity),
    );
  });

  it('should be defined', () => {
    expect(logsService).toBeDefined();
    expect(logsRepository).toBeDefined();
  });

  it('should import required modules', async () => {
    expect(module.get(UsersModule)).toBeDefined();
    expect(module.get(JwtModule)).toBeDefined();
  });

  it('should provide LogsService', () => {
    const service = module.get(LogsService);
    expect(service).toBeInstanceOf(LogsService);
  });
});
