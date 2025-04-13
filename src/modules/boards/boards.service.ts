import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { BoardDTO } from './boards.entity';

@Injectable()
export class BoardsService extends BaseService {
  constructor(
    @InjectRepository(BoardDTO)
    private boardsRepository: Repository<BoardDTO>,
  ) {
    super(boardsRepository);
  }
}
