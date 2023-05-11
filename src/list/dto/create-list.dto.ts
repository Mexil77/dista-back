import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/product/interface/product.interface';

export class CreateListDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly kind: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly registerDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly products?: Product[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly user: string;
}
