import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true })
  description?: string;
  @Column({ nullable: true, array: true })
  attachments?: string[];
  @Column()
  project: number;
  @Column()
  creator: number;
  @Column({ nullable: true, array: true })
  visibilityType?: number[];
  @Column({ nullable: true })
  visibilityValue?: string;
  @Column()
  createdAt: string;
  @Column({ nullable: true })
  updatedAt?: string;
  @Column({ nullable: true })
  deletedAt?: string;
}
