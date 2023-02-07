import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { Store } from './interface/store.interface';
import { CreateStoreDto } from './dto/create-store.dto';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StoreService {
  constructor(
    @Inject('StoreModelToken')
    public readonly storeModel: PaginateModel<Store>,
    @Inject(forwardRef(() => UserService))
    public readonly userService: UserService,
  ) {}

  public async getAll(
    request: any,
    token: AccessTocken,
  ): Promise<PaginateModel<Store>> {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Found' });
    const { query } = request;
    const options: PaginateOptions = {
      limit: 100,
      page: 1,
      sort: { createdAt: -1 },
    };
    const searchQuery = { user: dbUser._id };
    const stores = await this.storeModel.paginate({ ...searchQuery }, options);
    return stores;
  }

  public async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    const dbStore = await this.storeModel.findOne({
      name: createStoreDto.name,
      user: createStoreDto.user,
    });

    if (dbStore)
      throw new BadRequestException({ message: 'Store already exist' });
    const newStore = this.storeModel(createStoreDto);
    return await newStore.save();
  }

  public async updateStore(storeId: string, params: any): Promise<Store> {
    const dbStore = await this.storeModel.findById(storeId);
    if (!dbStore)
      throw new BadRequestException({ message: 'Store doesnt exist' });
    if (params.products) {
      dbStore.products = dbStore.products.concat(params.products);
    }

    return await dbStore.save();
  }

  public async findStore(params): Promise<Store> {
    const dbStore = await this.storeModel.findOne(params);
    if (!dbStore) throw new BadRequestException({ message: 'Store not Found' });
    return dbStore;
  }
}
