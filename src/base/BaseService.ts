import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';
import { adjustForUTCOffset } from './adjustForUTCOffset';

export class BaseService {
  constructor(private repository: Repository<any>) {}

  findAll(): Promise<any[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<any | null> {
    return this.repository.findOneBy({ id });
  }

  findBy(entity: any): Promise<any | null> {
    return this.repository.findOneBy(entity);
  }

  create(item: any): Promise<any> {
    const createdDate = formatISO(adjustForUTCOffset(new Date()));
    const newItem = this.repository.create({ ...item, createdAt: createdDate });

    return this.repository.save(newItem);
  }

  update(id: number, newItem: any): Promise<UpdateResult> {
    const updatedDate = formatISO(adjustForUTCOffset(new Date()));

    return this.repository.update(
      { id },
      { ...newItem, updatedAt: updatedDate },
    );
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(adjustForUTCOffset(new Date()));

    return this.repository.update(
      { id },
      { updatedAt: updatedDate, deletedAt: updatedDate },
    );
  }
}
