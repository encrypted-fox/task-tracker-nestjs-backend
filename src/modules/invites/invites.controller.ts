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
import { ApiQueryDecorator } from '../../helpers/decorators/ApiQueryDecorator';

import { I18n, I18nContext } from 'nestjs-i18n';

import {
  BaseController,
  type BaseQueryParams,
  type Response,
} from '../../helpers/base/BaseController';

import { LogAction } from '../logs/logs.decorator';

import { InvitesService } from './invites.service';
import { InvitesEntity } from './invites.entity';

@ApiBearerAuth()
@ApiTags('invites')
@Controller('api/invites')
export class InvitesController extends BaseController<
  InvitesEntity,
  InvitesService
> {
  constructor(private invitesService: InvitesService) {
    const invitesFields = [
      'id',
      'value',
      'team',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(invitesFields, invitesService);
  }

  @ApiQueryDecorator(
    'Get invites list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => InvitesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<InvitesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get invites',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => InvitesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<InvitesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get invite',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => InvitesEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<InvitesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create invite',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => InvitesEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => InvitesEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'invites', action: 'CREATE' })
  override async create(@Body() invite: InvitesEntity): Promise<InvitesEntity> {
    return super.create(invite);
  }

  @ApiOperation({
    summary: 'Update invite',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => InvitesEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => InvitesEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'invites', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: InvitesEntity,
  ): Promise<InvitesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete invite',
    description: 'Delete entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'invites', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
