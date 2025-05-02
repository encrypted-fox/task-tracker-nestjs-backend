import { BoardsModule } from './boards.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsEntity } from './boards.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('BoardsModule', () => {
  createModuleSpec<BoardsController, BoardsService>({
    module: BoardsModule,
    controller: BoardsController,
    service: BoardsService,
    entity: BoardsEntity,
  });
});
