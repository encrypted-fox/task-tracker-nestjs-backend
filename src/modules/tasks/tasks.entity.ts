import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { ProjectEntity } from '../projects/projects.entity';
import { BoardEntity } from '../boards/boards.entity';
import { ColumnEntity } from '../columns/columns.entity';
import { PriorityEntity } from '../priorities/priorities.entity';
import { TagEntity } from '../tags/tags.entity';
import { VisibilityEntity } from '../visibilities/visibilities.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  estimate?: string;

  @Column('text', { nullable: true, array: true })
  attachments?: string[];

  @ManyToOne(() => PriorityEntity, { nullable: true })
  @JoinColumn({ name: 'priority_id' })
  priority?: PriorityEntity;

  @ManyToMany(() => TagEntity, { nullable: true })
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'task_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags?: TagEntity[];

  @ManyToOne(() => ColumnEntity, { nullable: true })
  @JoinColumn({ name: 'column_id' })
  column?: ColumnEntity;

  @ManyToOne(() => BoardEntity, { nullable: true })
  @JoinColumn({ name: 'board_id' })
  board?: BoardEntity;

  @ManyToOne(() => ProjectEntity, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @ManyToOne(() => VisibilityEntity)
  @JoinColumn({ name: 'visibility_id' })
  visibility: VisibilityEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'task_users',
    joinColumn: { name: 'task_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  relatedUsers: UserEntity[];

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
