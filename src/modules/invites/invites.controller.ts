import { Controller } from '@nestjs/common';
import { InviteEntity } from './invites.entity';
import { InvitesService } from './invites.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/invites')
export class InvitesController extends BaseController<
  InviteEntity,
  InvitesService
> {
  constructor(private invitesService: InvitesService) {
    const invitesFields = [
      'id',
      'value',
      'team',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(invitesFields, invitesService);
  }
}
