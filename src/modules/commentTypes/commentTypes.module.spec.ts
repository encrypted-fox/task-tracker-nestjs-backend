import { CommentTypesModule } from './commentTypes.module';
import { CommentTypesController } from './commentTypes.controller';
import { CommentTypesService } from './commentTypes.service';
import { CommentTypesEntity } from './commentTypes.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('CommentTypesModule', () => {
  createModuleSpec<CommentTypesController, CommentTypesService>({
    module: CommentTypesModule,
    controller: CommentTypesController,
    service: CommentTypesService,
    entity: CommentTypesEntity,
  });
});
