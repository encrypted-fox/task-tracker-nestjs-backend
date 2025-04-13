import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { ColumnEntity } from './columns.entity';

@Injectable()
export class ColumnsService extends BaseService {
  constructor(
    @InjectRepository(ColumnEntity)
    private boardsRepository: Repository<ColumnEntity>,
  ) {
    super(boardsRepository);
  }
}
