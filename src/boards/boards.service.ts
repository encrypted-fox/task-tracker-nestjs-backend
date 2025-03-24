import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  findOne(id: number): Promise<Board | null> {
    return this.boardsRepository.findOneBy({ id });
  }

  create(project: Board): Promise<Board> {
    const newUser = this.boardsRepository.create(project)

    return this.boardsRepository.save(newUser)
  }

  update(id: number, newBoard: Board): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());
    
    return this.boardsRepository.update({ id }, {...newBoard, updatedAt: updatedDate});
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());
    
    return this.boardsRepository.update({ id }, { updatedAt: updatedDate, deletedAt: updatedDate });
  }
}