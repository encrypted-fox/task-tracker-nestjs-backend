import { FindOptionsRelations, Like, Repository } from 'typeorm';

export class BaseService {
  constructor(
    private repository: Repository<any>,
    private searchFields: string[],
    private relations: FindOptionsRelations<any>,
  ) {}

  async find(
    entity: any,
    filters?: any,
    query?: string,
    skip: number = 0,
    take: number = 20,
    order: any = {
      id: 'DESC',
    },
  ) {
    let where = null;

    if (Object.keys(filters).length) {
      if (query) {
        where = [];

        for (const field of this.searchFields) {
          where.push({ ...entity, ...filters, [field]: Like(`%${query}%`) });
        }
      } else {
        where = { ...entity, ...filters };
      }
    } else {
      if (query) {
        where = [];

        for (const field of this.searchFields) {
          where.push({ ...entity, [field]: Like(`%${query}%`) });
        }
      } else {
        where = { ...entity };
      }
    }

    return this.repository.find({
      relations: this.relations,
      where,
      order,
      skip,
      take,
      cache: true,
    });
  }

  async findOne(
    entity: any,
    filters?: any,
    query?: string,
    skip: number = 0,
    take: number = 20,
    order: any = {
      id: 'DESC',
    },
  ) {
    const found = await this.find(entity, filters, query, skip, take, order);
    return found ? found[0] : null;
  }

  async create(item: any): Promise<any> {
    const createdDate = new Date();
    const createdDateISO = createdDate.toISOString();
    const newItem = this.repository.create({
      ...item,
      createdAt: createdDateISO,
    });

    await this.repository.save(newItem);

    return this.repository.findOne({
      where: { id: newItem.id },
      relations: this.relations,
    });
  }

  async update(id: number, newItem: any): Promise<any> {
    const updatedDate = new Date();
    const updatedDateISO = updatedDate.toISOString();

    await this.repository.update(
      { id },
      { ...newItem, updatedAt: updatedDateISO },
    );

    return this.repository.findOne({
      where: { id },
      relations: this.relations,
    });
  }

  async remove(id: number): Promise<any> {
    const updatedDate = new Date();
    const updatedDateISO = updatedDate.toISOString();

    await this.repository.update(
      { id },
      { updatedAt: updatedDateISO, deletedAt: updatedDateISO },
    );

    return;
  }
}
