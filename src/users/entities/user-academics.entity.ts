import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity('UserAcademicsTB')
export class UserAcademics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  pastSchools: string[];

  @OneToOne(() => UserInfo, (userInfo) => userInfo.academics)
  userInfo: UserInfo;
}