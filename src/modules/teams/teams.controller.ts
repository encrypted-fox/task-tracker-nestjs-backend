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
import { TeamDTO } from './teams.entity';
import { TeamsService } from './teams.service';

@Controller('api/teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getTeamsList(@I18n() i18n: I18nContext) {
    const teams = await this.teamsService.findAll();

    const formattedTeams = [];

    for (let i = 0; i < teams.length; i++) {
      formattedTeams.push(await this.formatTeamItem(teams[i]));
    }

    return {
      header: this.formatTeamHeader(i18n),
      table: this.formatTeamTable(),
      data: formattedTeams,
      count: teams.length,

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
  async getAllTeams() {
    const teams = await this.teamsService.findAll();

    return {
      teams,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTeam(@Param('id') id: number) {
    return await this.teamsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createTeam(@I18n() i18n: I18nContext, @Body() team: TeamDTO) {
    const newTeam = await this.teamsService.create(team);

    return {
      data: this.formatTeamItem(newTeam),
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTeam(@Param('id') id: number, @Body() team: TeamDTO) {
    const newTeam = (await this.teamsService.update(id, team)).raw[0];

    return {
      data: this.formatTeamItem(newTeam),
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTeam(@Param('id') id: number) {
    await this.teamsService.remove(id);

    return;
  }

  formatTeamHeader(@I18n() i18n: I18nContext) {
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
        label: i18n.t('crud.createdAt'),
        name: 'createdAt',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.updatedAt'),
        name: 'updatedAt',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.deletedAt'),
        name: 'deletedAt',
        style: 'width: 250px;',
      },
    ];
  }

  formatTeamTable() {
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
      createdAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      updatedAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      deletedAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
    };
  }

  async formatTeamItem(team: TeamDTO) {
    return {
      id: team.id,
      parts: {
        id: {
          label: team.id,
        },
        title: {
          label: team.title,
        },
        createdAt: {
          label: team.createdAt,
        },
        updatedAt: {
          label: team.updatedAt,
        },
        deletedAt: {
          label: team.deletedAt,
        },
      },
    };
  }
}
