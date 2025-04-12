import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamDTO } from './teams/teams.entity';
import { UserDTO } from './users/users.entity';
import { ProjectDTO } from './projects/projects.entity';
import { BoardDTO } from './boards/boards.entity';
import { ColumnDTO } from './columns/columns.entity';
import { TaskDTO } from './tasks/tasks.entity';

import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

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
      entities: [UserDTO, TeamDTO, TaskDTO, ColumnDTO, BoardDTO, ProjectDTO],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
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
