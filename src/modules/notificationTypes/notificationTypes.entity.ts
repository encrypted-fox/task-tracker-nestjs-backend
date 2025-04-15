import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotificationTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  createdAt: string;
  @Column({ nullable: true })
  updatedAt?: string;
  @Column({ nullable: true })
  deletedAt?: string;
}
