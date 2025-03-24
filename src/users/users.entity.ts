import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;
  
  @Column()
  isActive: boolean;

  @Column()
  password: string;
  
  @Column()
  email: string;
  
  @Column({nullable: true}) 
  phone?: string;
  
  @Column({nullable: true}) 
  firstName?: string;
  
  @Column({nullable: true})
  middleName?: string;
  
  @Column({nullable: true})
  lastName?: string;
  
  @Column({nullable: true})
  avatar?: string;
  
  @Column({nullable: true})
  description?: string;

  @Column({nullable: true})
  roles?: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt?: string;

  @Column({ nullable: true })
  deletedAt?: string;
}