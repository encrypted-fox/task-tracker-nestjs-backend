import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamDTO } from './teams.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamDTO)
    private teamsRepository: Repository<TeamDTO>,
  ) {}

  findAll(): Promise<TeamDTO[]> {
    return this.teamsRepository.find();
  }

  findOne(id: number): Promise<TeamDTO | null> {
    return this.teamsRepository.findOneBy({ id });
  }

  findBy(entity: any): Promise<TeamDTO | null> {
    return this.teamsRepository.findOneBy(entity);
  }

  create(team: TeamDTO): Promise<TeamDTO> {
    const newTeam = this.teamsRepository.create(team);

    return this.teamsRepository.save(newTeam);
  }

  update(id: number, newTeam: TeamDTO): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.teamsRepository.update(
      { id },
      { ...newTeam, updatedAt: updatedDate },
    );
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.teamsRepository.update(
      { id },
      { updatedAt: updatedDate, deletedAt: updatedDate },
    );
  }
}
