import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { TeamEntity } from './teams.entity';

@Injectable()
export class TeamsService extends BaseService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamsRepository: Repository<TeamEntity>,
  ) {
    super(teamsRepository);
  }
}
