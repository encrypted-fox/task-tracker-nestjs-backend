import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { CommentTypeEntity } from './commentTypes.entity';

@Injectable()
export class CommentTypesService extends BaseService {
  constructor(
    @InjectRepository(CommentTypeEntity)
    private commentTypesRepository: Repository<CommentTypeEntity>,
  ) {
    const comments = {};
    const searchFields = ['id', 'title'];

    super(commentTypesRepository, searchFields, comments);
  }
}
