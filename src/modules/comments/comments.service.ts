import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { CommentEntity } from './comments.entity';

@Injectable()
export class CommentsService extends BaseService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {
    const relations = { user: true, commentType: true };
    const searchFields = ['id', 'description'];

    super(commentsRepository, searchFields, relations);
  }
}
