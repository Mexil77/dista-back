import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PhotoStoreDto } from './photo-store.dto';

export class CreateStoreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly products: string[];

  @ApiProperty()
  @IsOptional()
  readonly photo: PhotoStoreDto;
}
