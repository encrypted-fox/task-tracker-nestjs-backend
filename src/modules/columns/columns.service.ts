import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { ColumnsEntity } from './columns.entity';

@Injectable()
export class ColumnsService extends BaseService<ColumnsEntity> {
  constructor(
    @InjectRepository(ColumnsEntity)
    private columnsRepository: Repository<ColumnsEntity>,
  ) {
    const relations = { project: true, board: true, creator: true };
    const searchFields = ['id', 'title'];

    super(columnsRepository, searchFields, relations);
  }
}
