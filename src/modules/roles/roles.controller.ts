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
import { RoleEntity } from './roles.entity';
import { RolesService } from './roles.service';
import { ProjectEntity } from '../projects/projects.entity';

@Controller('api/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getRolesList(@I18n() i18n: I18nContext) {
    const roles = await this.rolesService.findAll();

    const formattedRoles = [];

    for (let i = 0; i < roles.length; i++) {
      formattedRoles.push(await this.formatRoleItem(roles[i]));
    }

    return {
      header: this.formatRoleHeader(i18n),
      table: this.formatRoleTable(),
      data: formattedRoles,
      count: roles.length,

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
  async getAllRoles(): Promise<RoleEntity[]> {
    return await this.rolesService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRole(@Param('id') id: number): Promise<RoleEntity> {
    return await this.rolesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRole(
    @I18n() i18n: I18nContext,
    @Body() role: RoleEntity,
  ): Promise<RoleEntity> {
    return await this.rolesService.create(role);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRole(
    @Param('id') id: number,
    @Body() role: RoleEntity,
  ): Promise<RoleEntity> {
    return (await this.rolesService.update(id, role)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    await this.rolesService.remove(id);
  }

  formatRoleHeader(@I18n() i18n: I18nContext) {
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

  formatRoleTable() {
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

  async formatRoleItem(role: RoleEntity) {
    return {
      id: role.id,
      parts: {
        id: {
          label: role.id,
        },
        title: {
          label: role.title,
        },
        createdAt: {
          label: role.createdAt,
        },
        updatedAt: {
          label: role.updatedAt,
        },
        deletedAt: {
          label: role.deletedAt,
        },
      },
    };
  }
}
