import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;

  @Column({nullable: true})
  description?: string;
  
  @Column({nullable: true})
  time?: string;
  
  @Column({nullable: true}) 
  priority?: number;
  
  @Column({nullable: true, array: true}) 
  attachments?: string;

  @Column({nullable: true}) 
  column?: number;
  
  @Column({nullable: true})
  board?: number;
  
  @Column({nullable: true})
  project?: number;
  
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

  // todo relations, related tasks, related users
}