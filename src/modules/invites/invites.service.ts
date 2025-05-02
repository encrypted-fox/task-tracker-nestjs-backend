import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { InvitesEntity } from './invites.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class InvitesService extends BaseService<InvitesEntity> {
  constructor(
    @InjectRepository(InvitesEntity)
    private invitesRepository: Repository<InvitesEntity>,
  ) {
    const relations = { creator: true, team: true };
    const searchFields = ['value'];

    super(invitesRepository, searchFields, relations);
  }

  private createAttempts = 5;

  private generateInviteCode(): string {
    return uuid().replace(/-/g, '').substring(0, 12).toLowerCase();
  }

  override async create(item: Partial<InvitesEntity>): Promise<InvitesEntity> {
    if (this.createAttempts++ > 5)
      throw new Error('Max create attempts exceeded');

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
