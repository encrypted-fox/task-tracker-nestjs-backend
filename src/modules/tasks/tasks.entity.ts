import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { ProjectsEntity } from '../projects/projects.entity';
import { BoardsEntity } from '../boards/boards.entity';
import { ColumnsEntity } from '../columns/columns.entity';
import { PrioritiesEntity } from '../priorities/priorities.entity';
import { TagsEntity } from '../tags/tags.entity';
import { VisibilitiesEntity } from '../visibilities/visibilities.entity';

@Entity()
export class TasksEntity {
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

  @ManyToOne(() => PrioritiesEntity, { nullable: true })
  @JoinColumn({ name: 'priority_id' })
  priority?: PrioritiesEntity;

  @ManyToMany(() => TagsEntity, { nullable: true })
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'task_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags?: TagsEntity[];

  @ManyToOne(() => ColumnsEntity, { nullable: true })
  @JoinColumn({ name: 'column_id' })
  column?: ColumnsEntity;

  @ManyToOne(() => BoardsEntity, { nullable: true })
  @JoinColumn({ name: 'board_id' })
  board?: BoardsEntity;

  @ManyToOne(() => ProjectsEntity, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectsEntity;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UsersEntity;

  @ManyToOne(() => VisibilitiesEntity)
  @JoinColumn({ name: 'visibility_id' })
  visibility: VisibilitiesEntity;

  @ManyToMany(() => UsersEntity)
  @JoinTable({
    name: 'task_users',
    joinColumn: { name: 'task_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  relatedUsers: UsersEntity[];

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
