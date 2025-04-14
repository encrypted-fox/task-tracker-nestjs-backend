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
import { RoleEntity } from './roles.entity';
import { RolesService } from './roles.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/roles')
export class RolesController extends BaseController {
  constructor(private rolesService: RolesService) {
    super();
  }

  private rolesFields = ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getRolesList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const roles = await this.rolesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.rolesFields),
      table: this.generateTable(this.rolesFields),
      data: this.generateData(roles, this.rolesFields),

      meta: {
        count: roles.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllRoles(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const roles = await this.rolesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: roles,

      meta: {
        count: roles.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRole(@Param('id') id: number): Promise<RoleEntity> {
    return this.rolesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRole(
    @I18n() i18n: I18nContext,
    @Body() role: RoleEntity,
  ): Promise<RoleEntity> {
    return this.rolesService.create(role);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRole(
    @Param('id') id: number,
    @Body() role: RoleEntity,
  ): Promise<RoleEntity> {
    return this.rolesService.update(id, role);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    await this.rolesService.remove(id);
  }
}
