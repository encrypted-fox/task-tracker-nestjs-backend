import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { UsersEntity } from '../users/users.entity';
import { NotificationTypesEntity } from '../notificationTypes/notificationTypes.entity';

@Entity('notifications')
export class NotificationsEntity {
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
    example: 'Description',
    description: 'Description. String.',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Type id. Foreign Key notificationTypes id, number.',
    type: () => NotificationTypesEntity,
  })
  @ManyToOne(() => NotificationTypesEntity)
  @JoinColumn({ name: 'type_id' })
  notificationType: Relation<NotificationTypesEntity>;

  @ApiProperty({
    example: 1,
    description: 'User id. Foreign Key users id, number.',
    type: () => UsersEntity,
  })
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UsersEntity>;

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
