import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RelationEntity } from './relations.entity';
import { UsersService } from '../users/users.service';
import { RelationsService } from './relations.service';
import { TasksService } from '../tasks/tasks.service';
import { RelationTypesService } from '../relationTypes/relationTypes.service';

@Controller('api/relations')
export class RelationsController {
  constructor(
    private relationsService: RelationsService,
    private usersService: UsersService,
    private tasksService: TasksService,
    private relationTypesService: RelationTypesService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getRelationsList(@I18n() i18n: I18nContext) {
    const relations = await this.relationsService.findAll();

    const formattedRelations = [];

    for (let i = 0; i < relations.length; i++) {
      formattedRelations.push(await this.formatRelationItem(relations[i]));
    }

    return {
      header: this.formatRelationHeader(i18n),
      table: this.formatRelationTable(),
      data: formattedRelations,
      count: relations.length,

      // todo sorting
      sort: {
        name: 'creator',
        direction: 'up',
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllRelations(): Promise<RelationEntity[]> {
    return await this.relationsService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRelation(@Param('id') id: number): Promise<RelationEntity> {
    return await this.relationsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRelation(
    @I18n() i18n: I18nContext,
    @Body() relation: RelationEntity,
  ): Promise<RelationEntity> {
    return await this.relationsService.create(relation);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRelation(
    @Param('id') id: number,
    @Body() relation: RelationEntity,
  ): Promise<RelationEntity> {
    return (await this.relationsService.update(id, relation)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRelation(@Param('id') id: number): Promise<void> {
    await this.relationsService.remove(id);
  }

  formatRelationHeader(@I18n() i18n: I18nContext) {
    return [
      {
        label: i18n.t('crud.id'),
        name: 'id',
        style: 'width: 100px;',
      },
      {
        label: i18n.t('crud.task'),
        name: 'task',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.relatedTasks'),
        name: 'relatedTasks',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.type'),
        name: 'type',
        style: 'width: 200px;',
      },
      {
        label: i18n.t('crud.creator'),
        name: 'creator',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.createdAt'),
        name: 'createdAt',
        style: 'width: 200px;',
      },
      {
        label: i18n.t('crud.updatedAt'),
        name: 'updatedAt',
        style: 'width: 200px;',
      },
      {
        label: i18n.t('crud.deletedAt'),
        name: 'deletedAt',
        style: 'width: 200px;',
      },
    ];
  }

  formatRelationTable() {
    return {
      id: {
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-secondary',
      },
      task: {
        outerStyle: 'width: 175px;',
        innerStyle: 'link text-ellipsis',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      relatedTasks: {
        outerStyle: 'width: 175px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link text-ellipsis',
      },
      type: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      creator: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link text-ellipsis',
      },
      createdAt: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      updatedAt: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      deletedAt: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
    };
  }

  async formatRelationItem(relation: RelationEntity) {
    const user = await this.usersService.findOne(relation.creator);
    const task = await this.tasksService.findOne(relation.task);
    const type = await this.relationTypesService.findOne(relation.type);
    const relatedTasks = [];

    for (const taskId of relation.relatedTasks) {
      relatedTasks.push(await this.tasksService.findOne(taskId));
    }

    return {
      id: relation.id,
      parts: {
        id: {
          label: `#${relation.id}`,
        },
        task: {
          label: task?.title,
          url: `tasks/${task?.id}`,
        },
        relatedTasks: {
          labels: relatedTasks.map((el) => el.title),
          urls: relatedTasks.map((el) => `tasks/${el.id}`),
        },
        type: {
          label: type?.title,
          url: `relationTypes/${type?.id}`,
        },
        creator: {
          label: `${user.lastName} ${user.firstName} ${user.middleName}`,
          url: `users/${user.id}`,
          img: user.avatar,
        },
        createdAt: {
          label: relation.createdAt,
        },
        updatedAt: {
          label: relation.updatedAt,
        },
        deletedAt: {
          label: relation.deletedAt,
        },
      },
    };
  }
}
