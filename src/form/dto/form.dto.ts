import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class FormDto {
  @ApiProperty()
  @IsBoolean()
  readonly storeState: boolean;

  @ApiProperty()
  @IsString()
  readonly storeName: string;

  @ApiProperty()
  @IsBoolean()
  readonly productSelect: boolean;

  @ApiProperty()
  @IsString()
  readonly productName: string;

  @ApiProperty()
  @IsNumber()
  readonly productValue: number;
}
