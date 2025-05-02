import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { UsersEntity } from '../users/users.entity';
import { ProjectsEntity } from '../projects/projects.entity';
import { VisibilitiesEntity } from '../visibilities/visibilities.entity';

@Entity('boards')
export class BoardsEntity {
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
    example: [
      'https://ru.wikipedia.org/static/images/project-logos/ruwiki.png',
    ],
    description: 'Attachment links array. String.',
  })
  @Column('text', { nullable: true, array: true })
  attachments?: string[];

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
