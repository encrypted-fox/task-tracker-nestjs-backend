import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { ProjectsEntity } from '../projects/projects.entity';
import { VisibilitiesEntity } from '../visibilities/visibilities.entity';

@Entity()
export class BoardsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column('text', { nullable: true, array: true })
  attachments?: string[];

  @ManyToOne(() => ProjectsEntity, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectsEntity;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UsersEntity;

  @ManyToOne(() => VisibilitiesEntity)
  @JoinColumn({ name: 'visibility_id' })
  visibility: VisibilitiesEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
