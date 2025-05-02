import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { BoardsService } from './boards.service';
import { BoardsEntity } from './boards.entity';

describe('BoardsService', () => {
  createServiceSpec<BoardsService, BoardsEntity>({
    service: BoardsService,
    entity: BoardsEntity,
    relations: { project: true, creator: true, visibility: true },
    searchFields: ['title', 'description'],
  });
});
