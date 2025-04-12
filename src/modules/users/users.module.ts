import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDTO } from './users.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserDTO]), ConfigModule.forRoot()],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
