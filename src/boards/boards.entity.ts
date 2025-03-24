import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true, array: true })
  attachments?: string;

  @Column({ nullable: true, array: true })
  columns?: string;

  @Column()
  creator: number;

  @Column()
  project: number;

  @Column({ nullable: true })
  visibility?: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}