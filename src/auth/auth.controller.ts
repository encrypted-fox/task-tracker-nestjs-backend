
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/exported';
import { DBUser } from 'src/users/users.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: DBUser) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: {username: string, password: string, repeatPassword: string, email: string}) {
    if (registerDto.password === registerDto.repeatPassword)
    
    return this.authService.register(registerDto.username, registerDto.password, registerDto.email);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}