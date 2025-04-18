import { Controller } from '@nestjs/common';
import { TeamEntity } from './teams.entity';
import { TeamsService } from './teams.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/teams')
export class TeamsController extends BaseController<TeamEntity, TeamsService> {
  constructor(private teamsService: TeamsService) {
    const teamsFields = ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'];

    super(teamsFields, teamsService);
  }
}
