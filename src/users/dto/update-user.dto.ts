import { IsString, IsDateString, IsEmail, IsOptional, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, ContactDto, AddressDto, AcademicsDto } from './create-user.dto';

// Reuse nested DTOs from create-user.dto.ts
export class UpdateContactDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  fax?: string;

  @IsString()
  @IsOptional()
  linkedInUrl?: string;
}

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;
}

export class UpdateAcademicsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  pastSchools?: string[];
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  dob?: string;

  @IsString()
  @IsOptional()
  occupation?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsOptional()
  contact?: UpdateContactDto;

  @IsOptional()
  address?: UpdateAddressDto;

  @IsOptional()
  academics?: UpdateAcademicsDto;
}