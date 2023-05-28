import {
  UseGuards,
  Controller,
  UseFilters,
  Get,
  Req,
  Delete,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { TokenRequirements } from 'src/common/decorators/tocken-requirements.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { PaginateResult } from 'mongoose-paginate';
import { Product } from './interface/product.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { ProductService } from './product.service';
import { TokenGuard } from 'src/common/guards/token.guard';
import { AccessTocken } from 'src/token/interface/access-token.interface';

@Controller('api/product')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async getAll(
    @Req() request,
    @Token() token: AccessTocken,
  ): Promise<PaginateResult<Product>> {
    return await this.productService.getAll(request, token);
  }

  @Put(':productId')
  @TokenRequirements([TokenTypeEnums.user])
  public async updateProduct(
    @Param('productId') productId: string,
    @Body() body: any,
  ): Promise<Product> {
    return await this.productService.updateProduct(productId, body);
  }

  @Delete(':productId')
  @TokenRequirements([TokenTypeEnums.user])
  public async delete(@Param('productId') productId: string): Promise<Product> {
    return await this.productService.delete(productId);
  }
}
