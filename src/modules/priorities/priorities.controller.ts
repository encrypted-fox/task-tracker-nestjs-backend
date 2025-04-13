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
import { PriorityEntity } from './priorities.entity';
import { PrioritiesService } from './priorities.service';

@Controller('api/priorities')
export class PrioritiesController {
  constructor(private prioritiesService: PrioritiesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getPrioritiesList(@I18n() i18n: I18nContext) {
    const priorities = await this.prioritiesService.findAll();

    const formattedPriorities = [];

    for (let i = 0; i < priorities.length; i++) {
      formattedPriorities.push(await this.formatPriorityItem(priorities[i]));
    }

    return {
      header: this.formatPriorityHeader(i18n),
      table: this.formatPriorityTable(),
      data: formattedPriorities,
      count: priorities.length,

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
  async getAllPriorities(): Promise<PriorityEntity[]> {
    return await this.prioritiesService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getPriority(@Param('id') id: number): Promise<PriorityEntity> {
    return await this.prioritiesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createPriority(
    @I18n() i18n: I18nContext,
    @Body() priority: PriorityEntity,
  ): Promise<PriorityEntity> {
    return await this.prioritiesService.create(priority);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updatePriority(
    @Param('id') id: number,
    @Body() priority: PriorityEntity,
  ): Promise<PriorityEntity> {
    return (await this.prioritiesService.update(id, priority)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deletePriority(@Param('id') id: number): Promise<void> {
    await this.prioritiesService.remove(id);
  }

  formatPriorityHeader(@I18n() i18n: I18nContext) {
    return [
      {
        label: i18n.t('crud.id'),
        name: 'id',
        style: 'width: 100px;',
      },
      {
        label: i18n.t('crud.title'),
        name: 'title',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.value'),
        name: 'value',
        style: 'width: 100px;',
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

  formatPriorityTable() {
    return {
      id: {
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-secondary',
      },
      title: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      value: {
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
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

  async formatPriorityItem(priority: PriorityEntity) {
    return {
      id: priority.id,
      parts: {
        id: {
          label: priority.id,
        },
        title: {
          label: priority.title,
        },
        value: {
          label: priority.value,
        },
        createdAt: {
          label: priority.createdAt,
        },
        updatedAt: {
          label: priority.updatedAt,
        },
        deletedAt: {
          label: priority.deletedAt,
        },
      },
    };
  }
}
