import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { TagEntity } from './tags.entity';

@Injectable()
export class TagsService extends BaseService<TagEntity> {
  constructor(
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(tagsRepository, searchFields, relations);
  }
}
