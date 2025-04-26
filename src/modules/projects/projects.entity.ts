import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { VisibilitiesEntity } from '../visibilities/visibilities.entity';

@Entity()
export class ProjectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column('text', { nullable: true, array: true })
  attachments?: string[];

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
