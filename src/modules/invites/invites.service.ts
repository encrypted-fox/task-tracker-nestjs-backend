import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { InviteEntity } from './invites.entity';
import { v4 as uuid } from 'uuid';

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

  private generateInviteCode(): string {
    return uuid().replace(/-/g, '').substring(0, 12).toLowerCase();
  }

  async create(item: Partial<InviteEntity>): Promise<InviteEntity> {
    try {
      item.value = this.generateInviteCode();

      return super.create(item);
    } catch (e) {
      if (e.code === '23505') {
        return this.create(item);
      }
      throw e;
    }
  }
}
