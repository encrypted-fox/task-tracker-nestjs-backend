import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardDTO } from './boards.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardDTO)
    private boardsRepository: Repository<BoardDTO>,
  ) {}

  findAll(): Promise<BoardDTO[]> {
    return this.boardsRepository.find();
  }

  findOne(id: number): Promise<BoardDTO | null> {
    return this.boardsRepository.findOneBy({ id });
  }

  create(project: BoardDTO): Promise<BoardDTO> {
    const newUser = this.boardsRepository.create(project);

    return this.boardsRepository.save(newUser);
  }

  update(id: number, newBoard: BoardDTO): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.boardsRepository.update(
      { id },
      { ...newBoard, updatedAt: updatedDate },
    );
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.boardsRepository.update(
      { id },
      { updatedAt: updatedDate, deletedAt: updatedDate },
    );
  }
}
