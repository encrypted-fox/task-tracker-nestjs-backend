import { Controller } from '@nestjs/common';
import { ColumnsEntity } from './columns.entity';
import { ColumnsService } from './columns.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/columns')
export class ColumnsController extends BaseController<
  ColumnsEntity,
  ColumnsService
> {
  constructor(private columnsService: ColumnsService) {
    const columnsFields = [
      'id',
      'title',
      'board',
      'project',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(columnsFields, columnsService);
  }
}
