import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitesEntity } from './invites.entity';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InvitesEntity])],
  providers: [InvitesService],
  exports: [InvitesService],
  controllers: [InvitesController],
})
export class InvitesModule {}
