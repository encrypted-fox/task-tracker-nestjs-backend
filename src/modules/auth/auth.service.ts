import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { InvitesService } from '../invites/invites.service';

import { ExtendedUsersEntity } from '../users/users.interface';
import { TeamsEntity } from '../teams/teams.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private invitesService: InvitesService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<ExtendedUsersEntity> {
    const user = await this.usersService.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({ ...user });

    delete user.password;

    return { ...user, token };
  }

  async register(
    username: string,
    password: string,
    email: string,
    teams: TeamsEntity[] = [],
  ): Promise<ExtendedUsersEntity> {
    const found = (await this.usersService.find({ username })).length;

    if (found) {
      throw new UnauthorizedException();
    }

    const hash = await bcrypt.hash(password, process.env.BCRYPT_SECRET);

    const user = {
      username,
      password: hash,
      email,
      teams,
    };
    const newUser = await this.usersService.create(user);

    const token = await this.jwtService.signAsync({ ...newUser });

    delete newUser.password;

    return { ...newUser, token };
  }

  async registerByInvite(
    username: string,
    password: string,
    email: string,
    inviteCode: string,
  ): Promise<ExtendedUsersEntity> {
    if (!inviteCode) {
      throw new BadRequestException();
    }

    if (username && password && email) {
      const inviteEntity = await this.invitesService.findOne({
        value: inviteCode,
      });

      if (!inviteEntity) {
        throw new ForbiddenException();
      }

      const result = await this.register(username, password, email, [
        inviteEntity?.team,
      ]);

      await this.invitesService.remove(inviteEntity.id);

      return result;
    }
  }
}
