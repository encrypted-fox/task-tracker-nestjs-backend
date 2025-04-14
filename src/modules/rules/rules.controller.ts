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
  Query,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RuleEntity } from './rules.entity';
import { RulesService } from './rules.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/rules')
export class RulesController extends BaseController {
  constructor(private rulesService: RulesService) {
    super();
  }

  private rulesFields = [
    'id',
    'title',
    'value',
    'role',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getRulesList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const rules = await this.rulesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.rulesFields),
      table: this.generateTable(this.rulesFields),
      data: this.generateData(rules, this.rulesFields),

      meta: {
        count: rules.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllRules(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const rules = await this.rulesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: rules,

      meta: {
        count: rules.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRule(@Param('id') id: number): Promise<RuleEntity> {
    return this.rulesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRule(
    @I18n() i18n: I18nContext,
    @Body() rule: RuleEntity,
  ): Promise<RuleEntity> {
    return this.rulesService.create(rule);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRule(
    @Param('id') id: number,
    @Body() rule: RuleEntity,
  ): Promise<RuleEntity> {
    return this.rulesService.update(id, rule);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRule(@Param('id') id: number): Promise<void> {
    await this.rulesService.remove(id);
  }
}
