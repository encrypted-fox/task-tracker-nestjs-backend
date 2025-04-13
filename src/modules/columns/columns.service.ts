import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { ColumnDTO } from './columns.entity';

@Injectable()
export class ColumnsService extends BaseService {
  constructor(
    @InjectRepository(ColumnDTO)
    private boardsRepository: Repository<ColumnDTO>,
  ) {
    super(boardsRepository);
  }
}
