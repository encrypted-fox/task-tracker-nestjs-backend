import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { InviteEntity } from './invites.entity';

@Injectable()
export class InvitesService extends BaseService<InviteEntity> {
  constructor(
    @InjectRepository(InviteEntity)
    private invitesRepository: Repository<InviteEntity>,
  ) {
    const relations = { project: true, creator: true };
    const searchFields = ['value'];

    super(invitesRepository, searchFields, relations);
  }
}
