import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { FormDto } from './dto/form.dto';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { Store } from 'src/store/interface/store.interface';

@Injectable()
export class FormService {
  constructor(
    @Inject(forwardRef(() => StoreService))
    private readonly storeService: StoreService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async createForm(body: FormDto, token: AccessTocken) {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not exits' });
    let currentStore: Store;
    if (body.storeState) {
      currentStore = await this.storeService.createStore({
        name: body.storeName,
        user: dbUser._id,
      });
    } else {
      currentStore = await this.storeService.findById(body.storeName);
    }
    if (body.productSelect) {
      let newProducts = [];
      for (const product of body.products) {
        const newProduct = await this.productService.createProduct({
          name: product.productName,
          price: product.productValue,
          units: product.productUnits,
          typeUnit: product.productTypeUnit,
          description: product.productDescription,
          user: dbUser._id,
          store: currentStore._id,
        });
        newProducts.push(newProduct._id);
      }
      await this.storeService.updateStore(currentStore._id, {
        products: newProducts,
      });
    }
  }
}
