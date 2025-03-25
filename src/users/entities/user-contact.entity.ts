import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity('UserContactTB')
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Enforce unique email
  email: string;

  @Column({ unique: true }) // Enforce unique phone
  phone: string;

  @Column({ nullable: true })
  fax?: string;

  @Column({ nullable: true })
  linkedInUrl?: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.contact)
  userInfo: UserInfo;
}