import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ unique: true })
  title: string;
  @Column()
  creator: string;
  @Column()
  createdAt: string;
  @Column({ nullable: true })
  updatedAt?: string;
  @Column({ nullable: true })
  deletedAt?: string;
}
