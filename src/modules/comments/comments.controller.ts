import { Controller } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { CommentsService } from './comments.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/comments')
export class CommentsController extends BaseController<
  CommentEntity,
  CommentsService
> {
  constructor(private commentsService: CommentsService) {
    const commentsFields = [
      'id',
      'description',
      'attachments',
      'commentType',
      'task',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(commentsFields, commentsService);
  }
}
