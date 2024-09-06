import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class DBUser {
  @PrimaryColumn({ unique: true })
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
}