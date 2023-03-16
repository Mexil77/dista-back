import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
import { Product } from 'src/product/interface/product.interface';

export class ListDto {
  @ApiProperty()
  @IsBoolean()
  readonly listState: boolean;

  @ApiProperty()
  @IsString()
  readonly listName: string;

  @ApiProperty()
  @IsString()
  readonly listId: string;

  @ApiProperty()
  @IsString()
  readonly listProduct: Product;
}
