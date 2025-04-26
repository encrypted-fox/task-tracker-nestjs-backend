import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { UsersEntity } from '../users/users.entity';
import { CommentTypesEntity } from '../commentTypes/commentTypes.entity';
import { TasksEntity } from '../tasks/tasks.entity';

@Entity()
export class CommentsEntity {
  @ApiProperty({
    example: 1,
    description: 'Id. Primary Key, number.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Description',
    description: 'Description. String.',
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    example: [
      'https://ru.wikipedia.org/static/images/project-logos/ruwiki.png',
    ],
    description: 'Attachment links array. String.',
  })
  @Column('text', { nullable: true, array: true })
  attachments?: string[];

  @ApiProperty({
    example: 1,
    description: 'Comment type id. Foreign Key commentTypes id, number.',
    type: () => CommentTypesEntity,
  })
  @ManyToOne(() => CommentTypesEntity)
  @JoinColumn({ name: 'type_id' })
  commentType: CommentTypesEntity;

  @ApiProperty({
    example: 1,
    description: 'Task id. Foreign Key tasks id, number.',
    type: () => TasksEntity,
  })
  @ManyToOne(() => TasksEntity)
  @JoinColumn({ name: 'task_id' })
  task: TasksEntity;

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
