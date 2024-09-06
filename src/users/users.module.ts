import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBUser } from './users.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([DBUser]), ConfigModule.forRoot()],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
