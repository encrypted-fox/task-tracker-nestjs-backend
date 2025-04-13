import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RelationEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  task: number;
  @Column({ array: true })
  relatedTasks: number[];
  @Column()
  type: number;
  @Column()
  creator: number;
  @Column()
  createdAt: string;
  @Column({ nullable: true })
  updatedAt?: string;
  @Column({ nullable: true })
  deletedAt?: string;
}
