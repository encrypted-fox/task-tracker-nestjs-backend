import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { BoardsEntity } from './boards.entity';

@Injectable()
export class BoardsService extends BaseService<BoardsEntity> {
  constructor(
    @InjectRepository(BoardsEntity)
    private boardsRepository: Repository<BoardsEntity>,
  ) {
    const relations = { project: true, creator: true };
    const searchFields = ['title', 'description'];

    super(boardsRepository, searchFields, relations);
  }
}
