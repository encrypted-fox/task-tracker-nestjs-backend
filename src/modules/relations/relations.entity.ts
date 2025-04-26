import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TasksEntity } from '../tasks/tasks.entity';
import { RelationTypesEntity } from '../relationTypes/relationTypes.entity';
import { UsersEntity } from '../users/users.entity';

@Entity()
export class RelationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TasksEntity)
  @JoinColumn({ name: 'task_id' })
  task: TasksEntity;

  @ManyToMany(() => TasksEntity)
  @JoinTable({
    name: 'relation_tasks',
    joinColumn: { name: 'relation_id' },
    inverseJoinColumn: { name: 'task_id' },
  })
  relatedTasks: TasksEntity[];

  @ManyToOne(() => RelationTypesEntity)
  @JoinColumn({ name: 'type_id' })
  relationType: RelationTypesEntity;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UsersEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
