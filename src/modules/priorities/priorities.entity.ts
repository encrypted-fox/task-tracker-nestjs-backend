import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('priorities')
export class PrioritiesEntity {
  @ApiProperty({
    example: 1,
    description: 'Id. Primary Key, number.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Title. Unique string.',
  })
  @Column({ unique: true })
  title: string;

  @ApiProperty({
    example: 1,
    description: 'Order of a priority. Number.',
  })
  @Column()
  value: number;

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
