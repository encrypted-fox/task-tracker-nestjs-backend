import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { InvitesModule } from '../invites/invites.module';
import { AuthModule } from './auth.module';

import { UsersEntity } from '../users/users.entity';
import { InvitesEntity } from '../invites/invites.entity';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(getRepositoryToken(UsersEntity))
      .useValue({
        find: jest.fn(),
        save: jest.fn(),
      })
      .overrideProvider(getRepositoryToken(InvitesEntity))
      .useValue({
        findOne: jest.fn(),
      })
      .overrideProvider(DataSource)
      .useValue({
        transaction: jest.fn(),
      })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import required modules', async () => {
    expect(module.get(ConfigModule)).toBeDefined();
    expect(module.get(UsersModule)).toBeDefined();
    expect(module.get(InvitesModule)).toBeDefined();
    expect(module.get(JwtModule)).toBeDefined();
  });

  it('should configure JWT module correctly', () => {
    const jwtService = module.get(JwtService);

    expect(jwtService).toBeInstanceOf(JwtService);
    expect(jwtService['options']).toMatchObject({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    });
  });

  it('should provide AuthService', () => {
    const service = module.get(AuthService);
    expect(service).toBeInstanceOf(AuthService);
  });

  afterAll(async () => {
    await module.close();
  });
});
