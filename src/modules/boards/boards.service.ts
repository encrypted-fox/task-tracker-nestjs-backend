import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { BoardEntity } from './boards.entity';

@Injectable()
export class BoardsService extends BaseService<BoardEntity> {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
  ) {
    const relations = { project: true, creator: true };
    const searchFields = ['title', 'description'];

    super(boardsRepository, searchFields, relations);
  }
}
