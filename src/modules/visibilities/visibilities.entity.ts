import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { VisibilityTypesEntity } from '../visibilityTypes/visibilityTypes.entity';

@Entity()
export class VisibilitiesEntity {
  @ApiProperty({
    example: 1,
    description: 'Id. Primary Key, number.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Title',
    description: 'Title. String.',
    required: true,
  })
  @Column()
  title: string;

  @ApiProperty({
    example: {
      id: 1,
    },
    description: 'Visibility object. JSON.',
  })
  @Column({ type: 'json', nullable: true })
  object?: Record<string, unknown>;

  @ApiProperty({
    example: 1,
    description: 'Visibility type id. Foreign Key visibilityTypes id, number.',
    type: () => VisibilityTypesEntity,
  })
  @ManyToOne(() => VisibilityTypesEntity)
  @JoinColumn({ name: 'type_id' })
  visibilityType: Relation<VisibilityTypesEntity>;

  @ApiProperty({
    example: '2011-10-05T14:48:00.000Z',
    description: 'Created date. ISO string. UTC 0',
  })
  @Column()
  createdAt?: string;

  @ApiProperty({
    example: '2011-10-05T14:48:00.000Z',
    description: 'Updated date. ISO string. UTC 0',
  })
  @Column({ nullable: true })
  updatedAt?: string;

  @ApiProperty({
    example: '2011-10-05T14:48:00.000Z',
    description: 'Deleted date. ISO string. UTC 0',
  })
  @Column({ nullable: true })
  deletedAt?: string;
}
