import { IsString, IsDateString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class ContactDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  fax?: string;

  @IsString()
  @IsOptional()
  linkedInUrl?: string;
}

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  zipCode: string;
}

export class AcademicsDto {
  @IsArray()
  @IsString({ each: true })
  pastSchools: string[];
}

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dob: string;

  @IsString()
  occupation: string;

  @IsString()
  gender: string;

  contact: ContactDto;

  address: AddressDto;

  academics: AcademicsDto;
}