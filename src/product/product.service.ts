import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { Product } from './interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductModelToken')
    public readonly productModel: PaginateModel<Product>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async getAll(
    request: any,
    token: AccessTocken,
  ): Promise<PaginateModel<Product>> {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Exist' });
    const { query } = request;
    const options: PaginateOptions = {
      limit: 100,
      page: 1,
      sort: { createdAt: -1 },
    };
    const searchQuery = { user: dbUser._id };
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
