import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsEntity } from './boards.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('BoardsController', () => {
  createControllerSpec<BoardsController>({
    controller: BoardsController,
    service: BoardsService,
    entity: BoardsEntity,
    entityName: 'boards',
  });
});
