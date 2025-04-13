import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { TeamDTO } from './teams.entity';

@Injectable()
export class TeamsService extends BaseService {
  constructor(
    @InjectRepository(TeamDTO)
    private teamsRepository: Repository<TeamDTO>,
  ) {
    super(teamsRepository);
  }
}
