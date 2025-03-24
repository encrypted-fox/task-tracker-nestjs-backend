import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true, array: true })
  attachments?: string;

  @Column()
  creator: number;

  @Column({ nullable: true })
  visibility?: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}