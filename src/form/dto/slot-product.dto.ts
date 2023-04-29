import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class SlotProductDto {
  @ApiProperty()
  @IsString()
  readonly productName: string;

  @ApiProperty()
  @IsNumber()
  readonly productValue: number;

  @ApiProperty()
  @IsNumber()
  readonly productUnits: number;

  @ApiProperty()
  @IsString()
  readonly productTypeUnit: string;

  @ApiProperty()
  @IsString()
  readonly productDescription: string;
}
