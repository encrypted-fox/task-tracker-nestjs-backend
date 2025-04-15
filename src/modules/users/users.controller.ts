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
  Query,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from '../auth/auth.guard';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/users')
export class UsersController extends BaseController {
  constructor(private usersService: UsersService) {
    super();
  }

  private usersFields = [
    'id',
    'username',
    'email',
    'phone',
    'firstName',
    'middleName',
    'lastName',
    'avatar',
    'teams',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getUsersList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const users = await this.usersService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.usersFields),
      table: this.generateTable(this.usersFields),
      data: this.generateData(users, this.usersFields),

      meta: {
        count: users.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllUsers(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const users = await this.usersService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: users,

      meta: {
        count: users.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    return this.usersService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createUser(
    @I18n() i18n: I18nContext,
    @Body() user: UserEntity,
  ): Promise<UserEntity> {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserEntity,
  ): Promise<UserEntity> {
    return this.usersService.update(id, user);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.usersService.remove(id);

    return;
  }
}
