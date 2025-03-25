import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademics } from './entities/user-academics.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserInfo) private userInfoRepo: Repository<UserInfo>,
    @InjectRepository(UserContact) private userContactRepo: Repository<UserContact>,
    @InjectRepository(UserAddress) private userAddressRepo: Repository<UserAddress>,
    @InjectRepository(UserAcademics) private userAcademicsRepo: Repository<UserAcademics>,
  ) {}

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userInfo = this.userInfoRepo.create({
        ...createUserDto,
        dob: new Date(createUserDto.dob),
        photoPath: file.path,
      });

      const contact = this.userContactRepo.create(createUserDto.contact);
      const address = this.userAddressRepo.create(createUserDto.address);
      const academics = this.userAcademicsRepo.create(createUserDto.academics);

      userInfo.contact = contact;
      userInfo.address = address;
      userInfo.academics = academics;

      await queryRunner.manager.save([userInfo, contact, address, academics]);
      await queryRunner.commitTransaction();
      return userInfo;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code === '23505') {
        const detail = error.detail || 'Unknown uniqueness violation';
        throw new BadRequestException(`Duplicate entry: ${detail}`);
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.userInfoRepo.find({ relations: ['contact', 'address', 'academics'] });
  }

  async findOne(id: number) {
    const user = await this.userInfoRepo.findOne({
      where: { id },
      relations: ['contact', 'address', 'academics'],
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, file?: Express.Multer.File) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.findOne(id);

      // Update UserInfo
      user.firstName = updateUserDto.firstName ?? user.firstName;
      user.lastName = updateUserDto.lastName ?? user.lastName;
      user.dob = updateUserDto.dob ? new Date(updateUserDto.dob) : user.dob;
      user.occupation = updateUserDto.occupation ?? user.occupation;
      user.gender = updateUserDto.gender ?? user.gender;
      user.photoPath = file ? file.path : user.photoPath;

      // Update Contact
      if (updateUserDto.contact) {
        user.contact.email = updateUserDto.contact.email ?? user.contact.email;
        user.contact.phone = updateUserDto.contact.phone ?? user.contact.phone;
        user.contact.fax = updateUserDto.contact.fax ?? user.contact.fax;
        user.contact.linkedInUrl = updateUserDto.contact.linkedInUrl ?? user.contact.linkedInUrl;
      }

      // Update Address
      if (updateUserDto.address) {
        user.address.street = updateUserDto.address.street ?? user.address.street;
        user.address.city = updateUserDto.address.city ?? user.address.city;
        user.address.state = updateUserDto.address.state ?? user.address.state;
        user.address.country = updateUserDto.address.country ?? user.address.country;
        user.address.zipCode = updateUserDto.address.zipCode ?? user.address.zipCode;
      }

      // Update Academics
      if (updateUserDto.academics) {
        user.academics.pastSchools = updateUserDto.academics.pastSchools ?? user.academics.pastSchools;
      }

      await queryRunner.manager.save(user);
      await queryRunner.manager.save(user.contact);
      await queryRunner.manager.save(user.address);
      await queryRunner.manager.save(user.academics);

      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code === '23505') {
        const detail = error.detail || 'Unknown uniqueness violation';
        throw new BadRequestException(`Duplicate entry: ${detail}`);
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userInfoRepo.remove(user);
    return { message: `User with ID ${id} deleted` };
  }
}