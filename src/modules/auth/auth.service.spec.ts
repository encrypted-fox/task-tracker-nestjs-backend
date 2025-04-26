import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { InvitesService } from '../invites/invites.service';

import {
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { TeamsEntity } from '../teams/teams.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let invitesService: InvitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: InvitesService,
          useValue: {
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mockToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    invitesService = module.get<InvitesService>(InvitesService);

    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((pass, hash) => Promise.resolve(pass === hash));
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve('hashedPassword'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return user with token when credentials are valid', async () => {
      const mockUser = {
        username: 'testUser',
        password: 'validPassword',
        email: 'test@example.com',
      };
      usersService.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await authService.signIn('testUser', 'validPassword');

      expect(result.token).toBe('mockToken');
      expect(result.password).toBeUndefined();
      expect(usersService.findOne).toHaveBeenCalledWith({
        username: 'testUser',
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      usersService.findOne = jest.fn().mockResolvedValue(null);

      await expect(authService.signIn('invalidUser', 'any')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUser = { username: 'test', password: 'hashedPass' };
      usersService.findOne = jest.fn().mockResolvedValue(mockUser);

      await expect(authService.signIn('test', 'wrongPass')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should create new user with hashed password', async () => {
      usersService.find = jest.fn().mockResolvedValue([]);
      usersService.create = jest.fn().mockResolvedValue({
        username: 'newUser',
        email: 'new@example.com',
        password: 'hashedPassword',
      });

      const result = await authService.register(
        'newUser',
        'rawPassword',
        'new@example.com',
      );

      expect(bcrypt.hash).toHaveBeenCalledWith(
        'rawPassword',
        process.env.BCRYPT_SECRET,
      );
      expect(result.token).toBe('mockToken');
      expect(result.password).toBeUndefined();
    });

    it('should throw error if username exists', async () => {
      usersService.find = jest.fn().mockResolvedValue([{ id: 1 }]);

      await expect(
        authService.register('existing', 'pass', 'email'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('registerByInvite', () => {
    const mockInvite = {
      id: 1,
      value: 'validCode',
      team: { id: 1, title: 'TestTeam' } as TeamsEntity,
    };

    it('should throw BadRequest if no invite code', async () => {
      await expect(
        authService.registerByInvite('user', 'pass', 'email', ''),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw Forbidden if invalid invite code', async () => {
      invitesService.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        authService.registerByInvite('user', 'pass', 'email', 'invalid'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should register user and delete invite', async () => {
      invitesService.findOne = jest.fn().mockResolvedValue(mockInvite);

      jest.spyOn(authService, 'register').mockResolvedValue({
        username: 'newUser',
        email: 'new@example.com',
        teams: [mockInvite.team],
        token: 'mockToken',
        password: 'hashedPassword',
        createdAt: new Date().toISOString(),
      });

      const result = await authService.registerByInvite(
        'newUser',
        'pass',
        'new@example.com',
        'validCode',
      );

      expect(invitesService.remove).toHaveBeenCalledWith(1);
      expect(result.teams).toContain(mockInvite.team);
      expect(result.token).toBe('mockToken');
    });
  });
});
