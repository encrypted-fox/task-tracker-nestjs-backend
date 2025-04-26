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
import { InvitesModule } from './invites/invites.module';
import { LogsModule } from './logs/logs.module';

import { UsersEntity } from './users/users.entity';
import { TeamsEntity } from './teams/teams.entity';
import { PrioritiesEntity } from './priorities/priorities.entity';
import { ColumnsEntity } from './columns/columns.entity';
import { BoardsEntity } from './boards/boards.entity';
import { ProjectsEntity } from './projects/projects.entity';
import { RulesEntity } from './rules/rules.entity';
import { RolesEntity } from './roles/roles.entity';
import { TasksEntity } from './tasks/tasks.entity';
import { TagsEntity } from './tags/tags.entity';
import { RelationTypesEntity } from './relationTypes/relationTypes.entity';
import { RelationsEntity } from './relations/relations.entity';
import { NotificationTypesEntity } from './notificationTypes/notificationTypes.entity';
import { NotificationsEntity } from './notifications/notifications.entity';
import { VisibilityTypesEntity } from './visibilityTypes/visibilityTypes.entity';
import { VisibilitiesEntity } from './visibilities/visibilities.entity';
import { InvitesEntity } from './invites/invites.entity';
import { LogsEntity } from './logs/logs.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    InvitesModule,
    LogsModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as unknown as 'postgres' | 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UsersEntity,
        TeamsEntity,
        PrioritiesEntity,
        ColumnsEntity,
        BoardsEntity,
        ProjectsEntity,
        RulesEntity,
        RolesEntity,
        TasksEntity,
        TagsEntity,
        RelationTypesEntity,
        RelationsEntity,
        NotificationTypesEntity,
        NotificationsEntity,
        VisibilityTypesEntity,
        VisibilitiesEntity,
        InvitesEntity,
        LogsEntity,
      ],
      synchronize: true,
    }),
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
