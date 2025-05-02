import { FindOptionsRelations, Like, Repository } from 'typeorm';

export class BaseService<Entity> {
  constructor(
    private repository: Repository<any>,
    private searchFields: string[],
    private relations: FindOptionsRelations<any>,
  ) {}

  public async find(
    entity: Partial<Entity>,
    filters?: any,
    query?: string,
    skip: number = 0,
    take: number = 20,
    order: any = {
      id: 'DESC',
    },
  ): Promise<Entity[]> {
    let where: any;

    if (filters && Object.keys(filters).length) {
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

  public async findOne(
    entity: Partial<Entity>,
    filters?: any,
    query?: string,
    skip: number = 0,
    take: number = 20,
    order: any = {
      id: 'DESC',
    },
  ): Promise<Entity> {
    const found = await this.find(entity, filters, query, skip, take, order);
    return found?.length ? found[0] : null;
  }

  public async create(item: Partial<Entity>): Promise<Entity> {
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

  public async update(id: number, newItem: Partial<Entity>): Promise<Entity> {
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

  public async remove(id: number): Promise<void> {
    const updatedDate = new Date();
    const updatedDateISO = updatedDate.toISOString();

    await this.repository.update(
      { id },
      { updatedAt: updatedDateISO, deletedAt: updatedDateISO },
    );
  }
}
