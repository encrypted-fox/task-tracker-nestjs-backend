import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { CommentTypesEntity } from '../commentTypes/commentTypes.entity';
import { TasksEntity } from '../tasks/tasks.entity';

@Entity()
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description?: string;

  @Column('text', { nullable: true, array: true })
  attachments?: string[];

  @ManyToOne(() => CommentTypesEntity)
  @JoinColumn({ name: 'type_id' })
  commentType: CommentTypesEntity;

  @ManyToOne(() => TasksEntity)
  @JoinColumn({ name: 'task_id' })
  task: TasksEntity;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  creator: UsersEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
