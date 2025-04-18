import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { TeamEntity } from './teams.entity';

@Injectable()
export class TeamsService extends BaseService<TeamEntity> {
  constructor(
    @InjectRepository(TeamEntity)
    private teamsRepository: Repository<TeamEntity>,
  ) {
    const relations = { creator: true };
    const searchFields = ['id', 'title'];

    super(teamsRepository, searchFields, relations);
  }
}
