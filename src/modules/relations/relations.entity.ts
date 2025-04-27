import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { TasksEntity } from '../tasks/tasks.entity';
import { RelationTypesEntity } from '../relationTypes/relationTypes.entity';
import { UsersEntity } from '../users/users.entity';

@Entity()
export class RelationsEntity {
  @ApiProperty({
    example: 1,
    description: 'Id. Primary Key, number.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Task id. Foreign Key tasks id, number.',
    type: () => TasksEntity,
  })
  @ManyToOne(() => TasksEntity)
  @JoinColumn({ name: 'task_id' })
  task: Relation<TasksEntity>;

  @ApiProperty({
    example: [1],
    description: 'Task ids array. Foreign Key tasks id, number.',
    type: () => TasksEntity,
  })
  @ManyToMany(() => TasksEntity)
  @JoinTable({
    name: 'relation_tasks',
    joinColumn: { name: 'relation_id' },
    inverseJoinColumn: { name: 'task_id' },
  })
  relatedTasks: Relation<TasksEntity[]>;

  @ApiProperty({
    example: 1,
    description: 'Relation type id. Foreign Key relationTypes id, number.',
    type: () => RelationTypesEntity,
  })
  @ManyToOne(() => RelationTypesEntity)
  @JoinColumn({ name: 'type_id' })
  relationType: Relation<RelationTypesEntity>;

  @ApiProperty({
    example: 1,
    description: 'Creator id. Foreign Key users id, number.',
    type: () => UsersEntity,
  })
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: Relation<UsersEntity>;

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
