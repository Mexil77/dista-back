import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PhotoProductDto } from './photo-product.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly units: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly typeUnit: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly store?: string;

  @ApiProperty()
  @IsOptional()
  readonly photo?: PhotoProductDto;
}
