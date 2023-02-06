import { Controller, UseFilters, Get, Req } from '@nestjs/common';
import { TokenRequirements } from 'src/common/decorators/tocken-requirements.decorator';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { PaginateResult } from 'mongoose-paginate';
import { Product } from './interface/product.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { ProductService } from './product.service';

@Controller('api/product')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @TokenRequirements([TokenTypeEnums.user])
  public async getAll(@Req() request): Promise<PaginateResult<Product>> {
    return await this.productService.getAll(request);
  }
}
