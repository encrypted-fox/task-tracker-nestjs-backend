import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrioritiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  value: number;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
