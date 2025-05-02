import { I18nContext } from 'nestjs-i18n';

import { BaseService } from './BaseService';

import { generateHeader } from '../generators/generateHeader';
import { generateTable } from '../generators/generateTable';
import { generateData } from '../generators/generateData';

import type { Header } from '../generators/generateHeader';
import type { Table } from '../generators/generateTable';
import type { Data } from '../generators/generateData';

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
  order: { [key: string]: string };
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
    i18n: I18nContext,
    queryParams: BaseQueryParams,
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

  async getAll(queryParams: BaseQueryParams): Promise<Response<Entity>> {
    const entities = await this.service.find(
      {},
      queryParams?.filters,
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

  async get(id: number): Promise<Entity> {
    return this.service.findOne({ id } as unknown as Partial<Entity>);
  }

  async create(board: Entity): Promise<Entity> {
    return this.service.create(board);
  }

  async update(id: number, entity: Entity): Promise<Entity> {
    return this.service.update(id, entity);
  }

  async delete(id: number): Promise<void> {
    await this.service.remove(id);
  }
}
