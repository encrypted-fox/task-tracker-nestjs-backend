import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { CommentsEntity } from './comments.entity';

@Injectable()
export class CommentsService extends BaseService<CommentsEntity> {
  constructor(
    @InjectRepository(CommentsEntity)
    private commentsRepository: Repository<CommentsEntity>,
  ) {
    const relations = { creator: true, task: true, commentType: true };
    const searchFields = ['id', 'description'];

    super(commentsRepository, searchFields, relations);
  }
}
