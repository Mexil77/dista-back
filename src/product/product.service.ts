import { Injectable, Inject } from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductModelToken')
    public readonly productModel: PaginateModel<Product>,
  ) {}

  public async getAll(request: any): Promise<PaginateModel<Product>> {
    const { query } = request;
    const options: PaginateOptions = {
      limit: 100,
      page: 1,
      sort: { createdAt: -1 },
    };
    const searchQuery = { name: query.name };
    const products = await this.productModel.paginate(
      { ...searchQuery },
      options,
    );
    return products;
  }
}
