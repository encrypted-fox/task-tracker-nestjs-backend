import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { TeamsEntity } from '../teams/teams.entity';
import { RolesEntity } from '../roles/roles.entity';

@Entity('users')
export class UsersEntity {
  @ApiProperty({
    example: 1,
    description: 'Id. Primary Key, number.',
  })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({
    example: 'john_1234',
    description: 'Username. Unique string.',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: '12mfkl2bh3uioiapdf7234901hljk',
    description: 'Password. String.',
  })
  @Column()
  password?: string;

  @ApiProperty({
    example: '1234@gmail.com',
    description: 'Email string.',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '+79269740431',
    description: 'Phone string.',
  })
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty({
    example: 'John',
    description: 'First name. String.',
  })
  @Column({ nullable: true })
  firstName?: string;

  @ApiProperty({
    example: 'Henry',
    description: 'Middle name. String.',
  })
  @Column({ nullable: true })
  middleName?: string;

  @ApiProperty({
    example: 'Eden',
    description: 'Last name. String.',
  })
  @Column({ nullable: true })
  lastName?: string;

  @ApiProperty({
    example: [
      'https://ru.wikipedia.org/static/images/project-logos/ruwiki.png',
    ],
    description: 'Avatar link. String.',
  })
  @Column({ nullable: true })
  avatar?: string;

  @ApiProperty({
    example: 1,
    description: 'Team ids array. Foreign Key teams id, number.',
    type: () => TeamsEntity,
  })
  @ManyToMany(() => TeamsEntity, { nullable: true })
  @JoinTable({
    name: 'user_teams',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'team_id' },
  })
  teams?: Relation<TeamsEntity[]>;

  @ApiProperty({
    example: 1,
    description: 'Role id. Foreign Key roles id, number.',
    type: () => RolesEntity,
  })
  @ManyToOne(() => RolesEntity, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role?: Relation<RolesEntity>;

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
