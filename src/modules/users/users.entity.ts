import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TeamsEntity } from '../teams/teams.entity';
import { RolesEntity } from '../roles/roles.entity';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  avatar?: string;

  @ManyToMany(() => TeamsEntity, { nullable: true })
  @JoinTable({
    name: 'user_teams',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'team_id' },
  })
  teams?: TeamsEntity[];

  @ManyToOne(() => RolesEntity, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role?: RolesEntity;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}
