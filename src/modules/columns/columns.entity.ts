import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { BoardsEntity } from '../boards/boards.entity';
import { ProjectsEntity } from '../projects/projects.entity';

@Entity()
export class ColumnsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => BoardsEntity, { nullable: true })
  @JoinColumn({ name: 'board_id' })
  board?: BoardsEntity;

  @ManyToOne(() => ProjectsEntity, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectsEntity;

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
