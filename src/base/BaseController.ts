import { I18n, I18nContext } from 'nestjs-i18n';

import { Body, Param, Query } from '@nestjs/common';

import { BaseService } from './BaseService';

import { generateHeader } from '../helpers/generators/generateHeader';
import { generateTable } from '../helpers/generators/generateTable';
import { generateData } from '../helpers/generators/generateData';

import type { Header } from '../helpers/generators/generateHeader';
import type { Table } from '../helpers/generators/generateTable';
import type { Data } from '../helpers/generators/generateData';

export type BaseQueryParams = {
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

export type Response<Entity> = {
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

  async get(@Param('id') id: number): Promise<Entity> {
    return this.service.findOne({ id } as unknown as Partial<Entity>);
  }

  async create(@Body() board: Entity): Promise<Entity> {
    return this.service.create(board);
  }

  async update(
    @Param('id') id: number,
    @Body() entity: Entity,
  ): Promise<Entity> {
    return this.service.update(id, entity);
  }

  async delete(@Param('id') id: number): Promise<void> {
    await this.service.remove(id);
  }
}
