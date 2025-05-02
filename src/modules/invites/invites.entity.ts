import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { UsersEntity } from '../users/users.entity';
import { TeamsEntity } from '../teams/teams.entity';

@Entity('invites')
export class InvitesEntity {
  @ApiProperty({
    example: 1,
    description: 'Id. Primary Key, number.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Invite key. UUID string.',
  })
  @Column({ unique: true })
  value: string;

  @ApiProperty({
    example: 1,
    description: 'Creator id. Foreign Key users id, number.',
    type: () => UsersEntity,
  })
  @ManyToOne(() => UsersEntity, { nullable: true })
  @JoinColumn({ name: 'creator_id' })
  creator?: Relation<UsersEntity>;

  @ApiProperty({
    example: 1,
    description: 'Team id. Foreign Key teams id, number.',
    type: () => TeamsEntity,
  })
  @ManyToOne(() => TeamsEntity, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  team?: Relation<TeamsEntity>;

  @ApiProperty({
    example: '2011-10-05T14:48:00.000Z',
    description: 'Created date. ISO string. UTC 0',
  })
  @Column()
  createdAt?: string;

  @ApiProperty({
    example: '2011-10-05T14:48:00.000Z',
    description: 'Updated date. ISO string. UTC 0',
  })
  @Column({ nullable: true })
  updatedAt?: string;

  @ApiProperty({
    example: '2011-10-05T14:48:00.000Z',
    description: 'Deleted date. ISO string. UTC 0',
  })
  @Column({ nullable: true })
  deletedAt?: string;
}
