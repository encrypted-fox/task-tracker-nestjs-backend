import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamEntity } from './teams/teams.entity';
import { UserEntity } from './users/users.entity';
import { ProjectEntity } from './projects/projects.entity';
import { BoardEntity } from './boards/boards.entity';
import { ColumnEntity } from './columns/columns.entity';
import { TaskEntity } from './tasks/tasks.entity';
import { PriorityEntity } from './priorities/priorities.entity';
import { RuleEntity } from './rules/rules.entity';

import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { RoleEntity } from './roles/roles.entity';
import { RelationEntity } from './relations/relations.entity';
import { RelationTypeEntity } from './relationTypes/relationTypes.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as unknown as 'postgres' | 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserEntity,
        TeamEntity,
        TaskEntity,
        ColumnEntity,
        BoardEntity,
        ProjectEntity,
        PriorityEntity,
        RuleEntity,
        RoleEntity,
        RuleEntity,
        RelationTypeEntity,
        RelationEntity,
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['locale'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
})
export class AppModule {}
