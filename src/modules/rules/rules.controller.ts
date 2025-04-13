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
import { RuleEntity } from './rules.entity';
import { RulesService } from './rules.service';
import { RoleEntity } from '../roles/roles.entity';

@Controller('api/rules')
export class RulesController {
  constructor(private rulesService: RulesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getRulesList(@I18n() i18n: I18nContext) {
    const rules = await this.rulesService.findAll();

    const formattedRules = [];

    for (let i = 0; i < rules.length; i++) {
      formattedRules.push(await this.formatRuleItem(rules[i]));
    }

    return {
      header: this.formatRuleHeader(i18n),
      table: this.formatRuleTable(),
      data: formattedRules,
      count: rules.length,

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
  async getAllRules(): Promise<RuleEntity[]> {
    return await this.rulesService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRule(@Param('id') id: number): Promise<RuleEntity> {
    return await this.rulesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRule(
    @I18n() i18n: I18nContext,
    @Body() rule: RuleEntity,
  ): Promise<RuleEntity> {
    return await this.rulesService.create(rule);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRule(
    @Param('id') id: number,
    @Body() rule: RuleEntity,
  ): Promise<RuleEntity> {
    return (await this.rulesService.update(id, rule)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRule(@Param('id') id: number): Promise<void> {
    await this.rulesService.remove(id);
  }

  formatRuleHeader(@I18n() i18n: I18nContext) {
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

  formatRuleTable() {
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

  async formatRuleItem(rule: RuleEntity) {
    return {
      id: rule.id,
      parts: {
        id: {
          label: rule.id,
        },
        title: {
          label: rule.title,
        },
        value: {
          label: rule.value,
        },
        createdAt: {
          label: rule.createdAt,
        },
        updatedAt: {
          label: rule.updatedAt,
        },
        deletedAt: {
          label: rule.deletedAt,
        },
      },
    };
  }
}
