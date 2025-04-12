import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnDTO } from './columns.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnDTO)
    private columnsRepository: Repository<ColumnDTO>,
  ) {}

  findAll(): Promise<ColumnDTO[]> {
    return this.columnsRepository.find();
  }

  findOne(id: number): Promise<ColumnDTO | null> {
    return this.columnsRepository.findOneBy({ id });
  }

  create(column: ColumnDTO): Promise<ColumnDTO> {
    const newUser = this.columnsRepository.create(column);

    return this.columnsRepository.save(newUser);
  }

  update(id: number, newColumn: ColumnDTO): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.columnsRepository.update(
      { id },
      { ...newColumn, updatedAt: updatedDate },
    );
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.columnsRepository.update(
      { id },
      { updatedAt: updatedDate, deletedAt: updatedDate },
    );
  }
}
