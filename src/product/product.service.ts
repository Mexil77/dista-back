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
import { generateRandomColor } from 'src/common/utils/color';
import { ProductStatusEnum } from './enums/product-status.enum';

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
    const options: PaginateOptions = {
      limit: 100,
      page: 1,
      sort: { createdAt: -1 },
      populate: [{ path: 'store' }],
    };

    const { query } = request;
    const searchQuery = { user: dbUser._id, status: 'active' };
    if (query.store) searchQuery['store'] = query.store;

    const products = await this.productModel.paginate(
      { ...searchQuery },
      options,
    );
    return products;
  }

  public async updateProduct(productId: string, body: any): Promise<Product> {
    const productDb = await this.productModel.findById(productId);
    if (!productDb)
      throw new BadRequestException({ message: 'Product Not Exist' });
    const { data } = body;
    if (data.name) productDb.name = data.name;
    if (data.price) productDb.price = data.price;
    if (data.units) productDb.units = data.units;
    if (data.typeUnit) productDb.typeUnit = data.typeUnit;
    if (data.description) productDb.description = data.description;
    if (data.color) productDb.color = data.color;
    if (data.store) productDb.store = data.store;
    if (data.photo) productDb.photo = data.photo;
    await productDb.save();
    return productDb;
  }

  public async delete(productId: string): Promise<Product> {
    const product = await this.getCompletePopulatedProductById(productId);
    if (!product) {
      throw new BadRequestException();
    }
    product.set({ status: ProductStatusEnum.deleted });
    await product.save();
    return product;
  }

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const newProduct = this.productModel({
      ...createProductDto,
      color: generateRandomColor(),
    });
    return await newProduct.save();
  }

  public async getCompletePopulatedProductById(
    productId: string,
  ): Promise<Product> {
    return this.productModel
      .findById(productId)
      .populate([{ path: 'user' }, { path: 'store' }]);
  }
}
