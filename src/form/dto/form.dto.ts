import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
import { SlotProductDto } from './slot-product.dto';

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
  readonly products: SlotProductDto[];
}
