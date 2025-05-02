import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { LogsService } from './logs.service';
import { LogsEntity } from './logs.entity';

describe('LogsService', () => {
  createServiceSpec<LogsService, LogsEntity>({
    service: LogsService,
    entity: LogsEntity,
    relations: { creator: true },
    searchFields: ['title', 'action'],
  });
});
