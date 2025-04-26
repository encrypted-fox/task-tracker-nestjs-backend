import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RolesEntity } from '../roles/roles.entity';

@Entity()
export class RulesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  value: boolean;

  @ManyToOne(() => RolesEntity)
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
