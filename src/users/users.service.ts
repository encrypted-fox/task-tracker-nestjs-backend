import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBUser } from './users.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(DBUser)
    private usersRepository: Repository<DBUser>,
  ) {}

  findAll(): Promise<DBUser[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<DBUser | null> {
    return this.usersRepository.findOneBy({ username });
  }

  create(user: DBUser): Promise<DBUser> {
    const newUser = this.usersRepository.create(user)

    return this.usersRepository.save(newUser)
  }

  update(username: string, newUser: DBUser): Promise<UpdateResult> {
    return this.usersRepository.update({ username }, newUser);
  }

  remove(username: string): Promise<UpdateResult> {
    return this.usersRepository.update({ username }, { isActive: false });
  }
}