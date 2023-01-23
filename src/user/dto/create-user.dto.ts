import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  UserStatusEnum,
  UserStatusEnumAsArray,
} from '../enums/user-status.enum';
import { PhotoUserDto } from './photo-user.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  readonly photo: PhotoUserDto;

  @ApiProperty({ enum: UserStatusEnumAsArray })
  @IsOptional()
  @IsEnum(UserStatusEnum, { each: true })
  readonly status: UserStatusEnum;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly dateLastLogin: Date;

  @ApiProperty()
  @IsOptional()
  public phone: string;

  @ApiProperty()
  @IsOptional()
  public permissions: string[];
}
