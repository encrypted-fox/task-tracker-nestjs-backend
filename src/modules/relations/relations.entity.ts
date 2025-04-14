import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TaskEntity } from '../tasks/tasks.entity';
import { RelationTypeEntity } from '../relationTypes/relationTypes.entity';
import { UserEntity } from '../users/users.entity';

@Entity()
export class RelationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TaskEntity)
  @JoinColumn({ name: 'task_id' })
  task: TaskEntity;

  @ManyToMany(() => TaskEntity)
  @JoinTable({
    name: 'relation_tasks',
    joinColumn: { name: 'relation_id' },
    inverseJoinColumn: { name: 'task_id' },
  })
  relatedTasks: TaskEntity[];

  @ManyToOne(() => RelationTypeEntity)
  @JoinColumn({ name: 'type_id' })
  relationType: RelationTypeEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
