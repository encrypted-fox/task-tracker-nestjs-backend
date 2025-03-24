import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { Project } from './projects/projects.entity';
import { Board } from './boards/boards.entity';
import { Task } from './tasks/tasks.entity';

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
      entities: [User, Task, Board, Project],
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
