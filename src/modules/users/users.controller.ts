import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiQueryDecorator } from '../../helpers/ApiQueryDecorator';

import { I18n, I18nContext } from 'nestjs-i18n';

import {
  BaseController,
  type BaseQueryParams,
  type Response,
} from '../../base/BaseController';

import { AuthGuard } from '../auth/auth.guard';
import { LogAction } from '../logs/logs.decorator';

import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api/users')
export class UsersController extends BaseController<UsersEntity, UsersService> {
  constructor(private usersService: UsersService) {
    const usersFields = [
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

    super(usersFields, usersService);
  }

  @ApiQueryDecorator(
    'Get users list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => UsersEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<UsersEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get users',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => UsersEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<UsersEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get user',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => UsersEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<UsersEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create user',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => UsersEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => UsersEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'users', action: 'CREATE' })
  override async create(@Body() user: UsersEntity): Promise<UsersEntity> {
    return super.create(user);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => UsersEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => UsersEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'users', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: UsersEntity,
  ): Promise<UsersEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'users', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
