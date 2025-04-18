import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { ColumnEntity } from './columns.entity';

@Injectable()
export class ColumnsService extends BaseService<ColumnEntity> {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
  ) {
    const relations = { project: true, board: true, creator: true };
    const searchFields = ['id', 'title'];

    super(columnsRepository, searchFields, relations);
  }
}
