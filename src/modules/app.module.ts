import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { ColumnsModule } from './columns/columns.module';
import { BoardsModule } from './boards/boards.module';
import { ProjectsModule } from './projects/projects.module';
import { RulesModule } from './rules/rules.module';
import { RolesModule } from './roles/roles.module';
import { TasksModule } from './tasks/tasks.module';
import { TagsModule } from './tags/tags.module';
import { RelationTypesModule } from './relationTypes/relationTypes.module';
import { RelationsModule } from './relations/relations.module';
import { NotificationTypesModule } from './notificationTypes/notificationTypes.module';
import { NotificationsModule } from './notifications/notifications.module';
import { VisibilityTypesModule } from './visibilityTypes/visibilityTypes.module';
import { VisibilitiesModule } from './visibilities/visibilities.module';

import { UserEntity } from './users/users.entity';
import { TeamEntity } from './teams/teams.entity';
import { PriorityEntity } from './priorities/priorities.entity';
import { ColumnEntity } from './columns/columns.entity';
import { BoardEntity } from './boards/boards.entity';
import { ProjectEntity } from './projects/projects.entity';
import { RuleEntity } from './rules/rules.entity';
import { RoleEntity } from './roles/roles.entity';
import { TaskEntity } from './tasks/tasks.entity';
import { TagEntity } from './tags/tags.entity';
import { RelationTypeEntity } from './relationTypes/relationTypes.entity';
import { RelationEntity } from './relations/relations.entity';
import { NotificationTypeEntity } from './notificationTypes/notificationTypes.entity';
import { NotificationEntity } from './notifications/notifications.entity';
import { VisibilityTypeEntity } from './visibilityTypes/visibilityTypes.entity';
import { VisibilityEntity } from './visibilities/visibilities.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TeamsModule,
    PrioritiesModule,
    ColumnsModule,
    BoardsModule,
    ProjectsModule,
    RulesModule,
    RolesModule,
    TasksModule,
    TagsModule,
    RelationTypesModule,
    RelationsModule,
    NotificationTypesModule,
    NotificationsModule,
    VisibilityTypesModule,
    VisibilitiesModule,
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
        PriorityEntity,
        ColumnEntity,
        BoardEntity,
        ProjectEntity,
        RuleEntity,
        RoleEntity,
        TaskEntity,
        TagEntity,
        RelationTypeEntity,
        RelationEntity,
        NotificationTypeEntity,
        NotificationEntity,
        VisibilityTypeEntity,
        VisibilityEntity,
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
