import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { TagsEntity } from './tags.entity';

@Injectable()
export class TagsService extends BaseService<TagsEntity> {
  constructor(
    @InjectRepository(TagsEntity)
    private tagsRepository: Repository<TagsEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(tagsRepository, searchFields, relations);
  }
}
