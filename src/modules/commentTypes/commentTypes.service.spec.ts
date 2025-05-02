import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { CommentTypesService } from './commentTypes.service';
import { CommentTypesEntity } from './commentTypes.entity';

describe('CommentTypesService', () => {
  createServiceSpec<CommentTypesService, CommentTypesEntity>({
    service: CommentTypesService,
    entity: CommentTypesEntity,
    relations: {},
    searchFields: ['id', 'title'],
  });
});
