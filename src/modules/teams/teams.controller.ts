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
import { TeamEntity } from './teams.entity';
import { TeamsService } from 'src/modules/teams/teams.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/teams')
export class TeamsController extends BaseController {
  constructor(private teamsService: TeamsService) {
    super();
  }

  private teamsFields = ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getTeamsList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const teams = await this.teamsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.teamsFields),
      table: this.generateTable(this.teamsFields),
      data: this.generateData(teams, this.teamsFields),

      meta: {
        count: teams.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllTeams(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const teams = await this.teamsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: teams,

      meta: {
        count: teams.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTeam(@Param('id') id: number): Promise<TeamEntity> {
    return this.teamsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createTeam(
    @I18n() i18n: I18nContext,
    @Body() team: TeamEntity,
  ): Promise<TeamEntity> {
    return this.teamsService.create(team);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTeam(
    @Param('id') id: number,
    @Body() team: TeamEntity,
  ): Promise<TeamEntity> {
    return this.teamsService.update(id, team);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTeam(@Param('id') id: number): Promise<void> {
    await this.teamsService.remove(id);
  }
}
