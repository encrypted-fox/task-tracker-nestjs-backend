import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getUsersList(@I18n() i18n: I18nContext) {
    const users = await this.usersService.findAll();

    const formattedUsers = [];

    for (let i = 0; i < users.length; i++) {
      formattedUsers.push(await this.formatUserItem(users[i]));
    }

    return {
      header: this.formatUserHeader(i18n),
      table: this.formatUserTable(),
      data: formattedUsers,
      count: users.length,

      // todo sorting
      sort: {
        name: 'creator',
        direction: 'up',
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createUser(
    @I18n() i18n: I18nContext,
    @Body() user: UserEntity,
  ): Promise<UserEntity> {
    return await this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserEntity,
  ): Promise<UserEntity> {
    return (await this.usersService.update(id, user)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.remove(id);

    return;
  }

  formatUserHeader(@I18n() i18n: I18nContext) {
    return [
      {
        label: i18n.t('crud.id'),
        name: 'id',
        style: 'width: 100px;',
      },
      {
        label: i18n.t('crud.username'),
        name: 'username',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.email'),
        name: 'email',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.phone'),
        name: 'phone',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.firstName'),
        name: 'firstName',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.middleName'),
        name: 'middleName',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.lastName'),
        name: 'lastName',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.avatar'),
        name: 'avatar',
        style: 'width: 140px;',
      },
      {
        label: i18n.t('crud.createdAt'),
        name: 'createdAt',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.updatedAt'),
        name: 'updatedAt',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.deletedAt'),
        name: 'deletedAt',
        style: 'width: 250px;',
      },
    ];
  }

  formatUserTable() {
    return {
      id: {
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-secondary',
      },
      username: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      email: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      phone: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      firstName: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      middleName: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      lastName: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      avatar: {
        outerStyle: 'width: 140px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link text-ellipsis',
      },
      createdAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      updatedAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      deletedAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
    };
  }

  async formatUserItem(user: UserEntity) {
    return {
      id: user.id,
      parts: {
        id: {
          label: user.id,
        },
        username: {
          label: user.username,
        },
        email: {
          label: user.email,
        },
        phone: {
          label: user.phone,
        },
        firstName: {
          label: user.firstName,
        },
        middleName: {
          label: user.middleName,
        },
        lastName: {
          label: user.lastName,
        },
        avatar: {
          img: user.avatar,
        },
        createdAt: {
          label: user.createdAt,
        },
        updatedAt: {
          label: user.updatedAt,
        },
        deletedAt: {
          label: user.deletedAt,
        },
      },
    };
  }
}
