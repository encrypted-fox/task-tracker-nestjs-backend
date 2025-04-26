import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService extends BaseService<UsersEntity> {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {
    const relations = { teams: true, role: true };
    const searchFields = [
      'id',
      'username',
      'email',
      'phone',
      'firstName',
      'middleName',
      'lastName',
    ];

    super(usersRepository, searchFields, relations);
  }
}
