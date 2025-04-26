import { Controller } from '@nestjs/common';
import { BoardsEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/boards')
export class BoardsController extends BaseController<
  BoardsEntity,
  BoardsService
> {
  constructor(private boardsService: BoardsService) {
    const boardsFields = [
      'id',
      'title',
      'description',
      'attachments',
      'project',
      'creator',
      'visibility',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(boardsFields, boardsService);
  }
}
