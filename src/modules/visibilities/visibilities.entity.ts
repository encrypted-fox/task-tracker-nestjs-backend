import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VisibilityTypesEntity } from '../visibilityTypes/visibilityTypes.entity';

@Entity()
export class VisibilitiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'json', nullable: true })
  object?: Record<string, unknown>;

  @ManyToOne(() => VisibilityTypesEntity)
  @JoinColumn({ name: 'type_id' })
  visibilityType: VisibilityTypesEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
