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

import { UsersEntity } from '../users/users.entity';
import { ProjectsEntity } from '../projects/projects.entity';
import { BoardsEntity } from '../boards/boards.entity';
import { ColumnsEntity } from '../columns/columns.entity';
import { PrioritiesEntity } from '../priorities/priorities.entity';
import { TagsEntity } from '../tags/tags.entity';
import { VisibilitiesEntity } from '../visibilities/visibilities.entity';

@Entity()
export class TasksEntity {
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
    example: 'Description',
    description: 'Description. String.',
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    example: 24,
    description: 'Estimated time. Number of minutes.',
  })
  @Column({ nullable: true })
  estimate?: number;

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
    description: 'Priority id. Foreign Key priorities id, number.',
    type: () => PrioritiesEntity,
  })
  @ManyToOne(() => PrioritiesEntity, { nullable: true })
  @JoinColumn({ name: 'priority_id' })
  priority?: Relation<PrioritiesEntity>;

  @ApiProperty({
    example: [1],
    description: 'Tag ids array. Foreign Key tags id, number.',
    type: () => TagsEntity,
  })
  @ManyToMany(() => TagsEntity, { nullable: true })
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'task_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags?: Relation<TagsEntity[]>;

  @ApiProperty({
    example: 1,
    description: 'Column id. Foreign Key columns id, number.',
    type: () => ColumnsEntity,
  })
  @ManyToOne(() => ColumnsEntity, { nullable: true })
  @JoinColumn({ name: 'column_id' })
  column?: Relation<ColumnsEntity>;

  @ApiProperty({
    example: 1,
    description: 'Board id. Foreign Key boards id, number.',
    type: () => BoardsEntity,
  })
  @ManyToOne(() => BoardsEntity, { nullable: true })
  @JoinColumn({ name: 'board_id' })
  board?: Relation<BoardsEntity>;

  @ApiProperty({
    example: 1,
    description: 'Project id. Foreign Key projects id, number.',
    type: () => ProjectsEntity,
  })
  @ManyToOne(() => ProjectsEntity, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project?: Relation<ProjectsEntity>;

  @ApiProperty({
    example: 1,
    description: 'Creator id. Foreign Key users id, number.',
    type: () => UsersEntity,
  })
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: Relation<UsersEntity>;

  @ApiProperty({
    example: 1,
    description: 'Visibility id. Foreign Key visibilities id, number.',
    type: () => VisibilitiesEntity,
  })
  @ManyToOne(() => VisibilitiesEntity, { nullable: true })
  @JoinColumn({ name: 'visibility_id' })
  visibility?: Relation<VisibilitiesEntity>;

  @ApiProperty({
    example: [1],
    description: 'User ids array. Foreign Key users id, number.',
    type: () => UsersEntity,
  })
  @ManyToMany(() => UsersEntity)
  @JoinTable({
    name: 'task_users',
    joinColumn: { name: 'task_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  relatedUsers: Relation<UsersEntity[]>;

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
