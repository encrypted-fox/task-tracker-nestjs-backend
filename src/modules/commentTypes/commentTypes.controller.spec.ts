import { CommentTypesController } from './commentTypes.controller';
import { CommentTypesService } from './commentTypes.service';
import { CommentTypesEntity } from './commentTypes.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('CommentTypesController', () => {
  createControllerSpec<CommentTypesController>({
    controller: CommentTypesController,
    service: CommentTypesService,
    entity: CommentTypesEntity,
    entityName: 'commentTypes',
  });
});
