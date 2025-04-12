import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDTO)
    private usersRepository: Repository<UserDTO>,
  ) {}

  findAll(): Promise<UserDTO[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserDTO | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findBy(entity: any): Promise<UserDTO | null> {
    return this.usersRepository.findOneBy(entity);
  }

  create(user: UserDTO): Promise<UserDTO> {
    const newUser = this.usersRepository.create(user);

    return this.usersRepository.save(newUser);
  }

  update(id: number, newUser: UserDTO): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.usersRepository.update(
      { id },
      { ...newUser, updatedAt: updatedDate },
    );
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.usersRepository.update(
      { id },
      { updatedAt: updatedDate, deletedAt: updatedDate },
    );
  }
}
