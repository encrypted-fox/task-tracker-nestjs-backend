import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true })
  board?: number;
  @Column({ nullable: true })
  project?: number;
  @Column()
  creator: number;
  @Column()
  createdAt: string;
  @Column({ nullable: true })
  updatedAt?: string;
  @Column({ nullable: true })
  deletedAt?: string;
}
