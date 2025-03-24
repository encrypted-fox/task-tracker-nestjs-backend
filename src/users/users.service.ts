import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findBy(entity: any): Promise<User | null> {
    return this.usersRepository.findOneBy(entity);
  }

  create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user)

    return this.usersRepository.save(newUser)
  }

  update(id: number, newUser: User): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());
    
    return this.usersRepository.update({ id }, {...newUser, updatedAt: updatedDate});
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());
    
    return this.usersRepository.update({ id }, { isActive: false, updatedAt: updatedDate, deletedAt: updatedDate });
  }
}