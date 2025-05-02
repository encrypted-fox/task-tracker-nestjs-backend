import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { TeamsEntity } from '../teams/teams.entity';

@Entity('roles')
export class RolesEntity {
  @ApiProperty({
    example: 1,
    description: 'Id. Primary Key, number.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Title',
    description: 'Title. String.',
    required: true,
  })
  @Column()
  title: string;

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
