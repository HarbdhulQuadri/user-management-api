import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademics } from './entities/user-academics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, UserContact, UserAddress, UserAcademics])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}