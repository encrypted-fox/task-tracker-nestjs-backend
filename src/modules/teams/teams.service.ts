import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { TeamsEntity } from './teams.entity';

@Injectable()
export class TeamsService extends BaseService<TeamsEntity> {
  constructor(
    @InjectRepository(TeamsEntity)
    private teamsRepository: Repository<TeamsEntity>,
  ) {
    const relations = { creator: true };
    const searchFields = ['id', 'title'];

    super(teamsRepository, searchFields, relations);
  }
}
