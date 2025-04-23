import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/exported';
import { AuthService } from './auth.service';
import { UserEntity } from '../users/users.entity';
import { PartialUser } from '../users/users.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() request: UserEntity): Promise<PartialUser> {
    return this.authService.signIn(request.username, request.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(
    @Body()
    request: {
      username: string;
      password: string;
      repeatPassword: string;
      inviteCode: string;
      email: string;
    },
  ): Promise<PartialUser> {
    if (request.password === request.repeatPassword)
      return this.authService.registerByInvite(
        request.username,
        request.password,
        request.email,
        request.inviteCode,
      );
  }
}
