import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserContact } from './user-contact.entity';
import { UserAddress } from './user-address.entity';
import { UserAcademics } from './user-academics.entity';

@Entity('UserInfoTB')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dob: Date;

  @Column()
  occupation: string;

  @Column()
  gender: string;

  @Column()
  photoPath: string;

  @OneToOne(() => UserContact, (contact) => contact.userInfo, { cascade: true })
  @JoinColumn()
  contact: UserContact;

  @OneToOne(() => UserAddress, (address) => address.userInfo, { cascade: true })
  @JoinColumn()
  address: UserAddress;

  @OneToOne(() => UserAcademics, (academics) => academics.userInfo, { cascade: true })
  @JoinColumn()
  academics: UserAcademics;
}