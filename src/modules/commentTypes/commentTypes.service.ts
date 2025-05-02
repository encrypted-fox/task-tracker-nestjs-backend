import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { CommentTypesEntity } from './commentTypes.entity';

@Injectable()
export class CommentTypesService extends BaseService<CommentTypesEntity> {
  constructor(
    @InjectRepository(CommentTypesEntity)
    private commentTypesRepository: Repository<CommentTypesEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(commentTypesRepository, searchFields, relations);
  }
}
