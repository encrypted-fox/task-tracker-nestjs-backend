import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBUser } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

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
      entities: [DBUser],
      synchronize: true,
    }),
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
