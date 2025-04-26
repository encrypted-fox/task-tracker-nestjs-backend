import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { UsersEntity } from '../users/users.entity';

@Entity()
export class LogsEntity {
  @ApiProperty({
    example: 1,
    description: 'Id. Primary Key, number.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'api/tasks/1',
    description: 'Path to controller. String.',
  })
  @Column()
  path: string;

  @ApiProperty({
    example: 'CREATE',
    description: 'Action. String (CREATE, UPDATE, DELETE).',
  })
  @Column()
  action: 'CREATE' | 'UPDATE' | 'DELETE';

  @ApiProperty({
    example: 'tasks',
    description: 'Entity name. String.',
  })
  @Column()
  entity: string;

  @ApiProperty({
    example: {
      id: 1,
      body: { title: 'New title' },
      params: { id: 1 },
    },
    description: 'Log object. JSON.',
  })
  @Column({ type: 'json', nullable: true })
  object?: Record<string, unknown>;

  @ApiProperty({
    example: 1,
    description: 'Creator id. Foreign Key users id, number.',
    type: () => UsersEntity,
  })
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UsersEntity;

  @ApiProperty({
    example: '2011-10-05T14:48:00.000Z',
    description: 'Created date. ISO string. UTC 0',
  })
  @Column()
  createdAt: string;

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
