import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

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
  readonly listProduct: string;
}
