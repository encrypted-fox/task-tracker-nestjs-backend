import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PartialUser } from 'src/modules/users/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<PartialUser> {
    const user = (await this.usersService.find({ username }))[0];

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
  ): Promise<PartialUser> {
    const found = (await this.usersService.find({ username })).length;

    if (found) {
      throw new UnauthorizedException();
    }

    const hash = await bcrypt.hash(password, process.env.BCRYPT_SECRET);

    const user = {
      username,
      password: hash,
      email,
    };
    const newUser = await this.usersService.create(user);

    const token = await this.jwtService.signAsync({ ...newUser });

    delete newUser.password;

    return { ...newUser, token };
  }
}
