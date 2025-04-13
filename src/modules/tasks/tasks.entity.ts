import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ nullable: true, array: true })
  attachments?: string[];
  @Column({ nullable: true })
  priority?: number;
  @Column({ nullable: true, array: true })
  tags?: string[];
  @Column({ nullable: true })
  column?: number;
  @Column({ nullable: true })
  board?: number;
  @Column({ nullable: true })
  project?: number;
  @Column()
  creator: number;
  @Column({ nullable: true, array: true })
  visibilityType?: number[];
  @Column({ nullable: true })
  visibilityValue?: string;
  @Column({ nullable: true, array: true })
  relatedUsers?: number[];
  @Column()
  createdAt: string;
  @Column({ nullable: true })
  updatedAt?: string;
  @Column({ nullable: true })
  deletedAt?: string;
}
