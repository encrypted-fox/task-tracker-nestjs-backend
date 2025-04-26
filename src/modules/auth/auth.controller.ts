import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from 'src/exported';

import { AuthService } from './auth.service';

import { UsersEntity } from '../users/users.entity';
import { ExtendedUsersEntity } from '../users/users.interface';
import { request } from 'express';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in',
    description: 'Returns entity by id',
  })
  @ApiBody({
    type: () => UsersEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => UsersEntity })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() request: UsersEntity): Promise<ExtendedUsersEntity> {
    return this.authService.signIn(request.username, request.password);
  }

  @ApiOperation({
    summary: 'Sign in',
    description: 'Returns entity by id',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'john_doe',
          description: 'User login',
        },
        password: {
          type: 'string',
          example: 'P@ssw0rd!',
          description: 'Account password',
        },
        repeatPassword: {
          type: 'string',
          example: 'P@ssw0rd!',
          description: 'Password confirmation',
        },
        inviteCode: {
          type: 'string',
          example: 'ABCD1234EFGH',
          description: 'Invite code',
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'user@example.com',
          description: 'Email address',
        },
      },
      required: [
        'username',
        'password',
        'repeatPassword',
        'inviteCode',
        'email',
      ],
    },
  })
  @ApiCreatedResponse({ type: () => UsersEntity })
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
  ): Promise<ExtendedUsersEntity> {
    if (request.password === request.repeatPassword)
      return this.authService.registerByInvite(
        request.username,
        request.password,
        request.email,
        request.inviteCode,
      );
  }
}
