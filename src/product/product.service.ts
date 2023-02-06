import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { Product } from './interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';

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

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const dbProduct = await this.productModel.findOne({
      name: createProductDto.name,
      user: createProductDto.user,
      store: createProductDto.store,
    });
    if (dbProduct)
      throw new BadRequestException({ message: 'Product already added.' });
    const newProduct = this.productModel(createProductDto);
    return await newProduct.save();
  }
}
