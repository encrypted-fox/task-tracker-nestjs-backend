import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { UserDTO } from './users.entity';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(UserDTO)
    private usersRepository: Repository<UserDTO>,
  ) {
    super(usersRepository);
  }
}
