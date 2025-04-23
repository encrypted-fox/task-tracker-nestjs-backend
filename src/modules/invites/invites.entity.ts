import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { TeamEntity } from '../teams/teams.entity';

@Entity()
export class InviteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
