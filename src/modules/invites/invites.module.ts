import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteEntity } from './invites.entity';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InviteEntity])],
  providers: [InvitesService],
  exports: [InvitesService],
  controllers: [InvitesController],
})
export class InvitesModule {}
