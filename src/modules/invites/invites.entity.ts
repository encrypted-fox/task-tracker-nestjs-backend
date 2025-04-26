import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { TeamsEntity } from '../teams/teams.entity';

@Entity()
export class InvitesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UsersEntity;

  @ManyToOne(() => TeamsEntity)
  @JoinColumn({ name: 'team_id' })
  team: TeamsEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
