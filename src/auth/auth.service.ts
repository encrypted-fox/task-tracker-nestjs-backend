import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from 'src/users/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<AuthUser> {

    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    
    const token = await this.jwtService.signAsync({ ...user });
    
    delete user.isActive
    delete user.password

    const resp: AuthUser = {...user, token}

    return resp;
  }

  async register(
    username: string,
    password: string,
    email: string
  ): Promise<AuthUser> {
    if (await this.usersService.findOne(username)) {
      throw new UnauthorizedException()
    }

    const hash = await bcrypt.hash(password, process.env.BCRYPT_SECRET);

    const user = { username, password: hash, email, isActive: true }
    const newUser = await this.usersService.create(user)

    const token = await this.jwtService.signAsync({...newUser});

    delete newUser.isActive
    delete newUser.password

    return { ...newUser, token }
  }
}