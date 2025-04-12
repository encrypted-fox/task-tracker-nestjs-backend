import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDTO {
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
  @Column({ nullable: true, array: true })
  teams?: number;
  @Column({ nullable: true })
  role?: string;
  @Column()
  createdAt: string;
  @Column({ nullable: true })
  updatedAt?: string;
  @Column({ nullable: true })
  deletedAt?: string;
}
