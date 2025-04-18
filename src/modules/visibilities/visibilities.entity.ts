import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VisibilityTypeEntity } from '../visibilityTypes/visibilityTypes.entity';

@Entity()
export class VisibilityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'json', nullable: true })
  object?: Record<string, unknown>;

  @ManyToOne(() => VisibilityTypeEntity)
  @JoinColumn({ name: 'type_id' })
  visibilityType: VisibilityTypeEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
