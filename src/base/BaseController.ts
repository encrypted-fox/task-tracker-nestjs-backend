import { I18n, I18nContext } from 'nestjs-i18n';

import {
  Body,
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

import { AuthGuard } from '../modules/auth/auth.guard';
import { BaseService } from './BaseService';

import { generateHeader } from './generators/generateHeader';
import { generateTable } from './generators/generateTable';
import { generateData } from './generators/generateData';

import type { Header } from './generators/generateHeader';
import type { Table } from './generators/generateTable';
import type { Data } from './generators/generateData';

type BaseQueryParams = {
  query?: string;
  filters?: any;
  skip?: number;
  take?: number;
  order?: any;
};

type Meta = {
  count: number;
  skip?: number;
  take?: number;
  order: { [key: string]: 'DESC' | 'ASC' };
};

type Response<Entity> = {
  header?: Header;
  table?: Table;
  data: Data | Entity[];
  meta: Meta;
};

export class BaseController<Entity, Service extends BaseService<Entity>> {
  constructor(
    private fields: string[],
    private service: Service,
  ) {}
  public generateHeader = generateHeader;
  public generateTable = generateTable;
  public generateData = generateData;

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<Entity>> {
    const entities = await this.service.find(
      {},
      queryParams?.filters,
      queryParams?.query,
      queryParams?.skip,
      queryParams?.take,
      queryParams?.order,
    );

    return {
      header: this.generateHeader(i18n, this.fields),
      table: this.generateTable(this.fields),
      data: this.generateData(entities, this.fields),

      meta: {
        count: entities.length,
        skip: queryParams?.skip,
        take: queryParams?.take,
        order: queryParams?.order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<Entity>> {
    const entities = await this.service.find(
      {},
      JSON.parse(queryParams?.filters),
      queryParams?.query,
      queryParams?.skip,
      queryParams?.take,
      queryParams?.order,
    );

    return {
      data: entities,

      meta: {
        count: entities.length,
        skip: queryParams?.skip,
        take: queryParams?.take,
        order: queryParams?.order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Entity> {
    return this.service.findOne({ id } as unknown as Partial<Entity>);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(@Body() board: Entity): Promise<Entity> {
    return this.service.create(board);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() entity: Entity,
  ): Promise<Entity> {
    return this.service.update(id, entity);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.service.remove(id);
  }
}
