import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { List } from './interface/list.interface';
import { ListDto } from './dto/list.dto';
import { Product } from 'src/product/interface/product.interface';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { CreateListDto } from './dto/create-list.dto';
import { formatDate } from 'src/common/utils/date';
import { Store, StoreTotal } from 'src/store/interface/store.interface';
import { formatPrice } from 'src/common/utils/number';

@Injectable()
export class ListService {
  constructor(
    @Inject('ListModelToken')
    public readonly listModel: PaginateModel<List>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  public async getAll(
    request: any,
    token: AccessTocken,
  ): Promise<PaginateModel<List>> {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Exist' });
    const options: PaginateOptions = {
      limit: 100,
      page: 1,
      sort: { createdAt: -1 },
      populate: [
        { path: 'products', populate: { path: 'store' } },
        { path: 'storeTotals.store' },
      ],
    };

    const { query } = request;
    const searchQuery = { user: dbUser._id, kind: 'wish' };

    if (query.kind) searchQuery.kind = query.kind;
    const lists = await this.listModel.paginate({ ...searchQuery }, options);
    return lists;
  }

  public async saveBuy(body: CreateListDto, token: AccessTocken) {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User not Exist' });
    const newList = this.listModel({
      ...body,
      user: dbUser._id,
      name: `${body.name}-${formatDate(new Date())}`,
      kind: 'buy',
    });
    return await newList.save();
  }

  public async saveModalAddList(body: ListDto, token: AccessTocken) {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User not Exist' });
    if (body.listState) {
      await this.createList({
        name: body.listName,
        kind: 'wish',
        registerDate: new Date(),
        products: [body.listProduct],
        user: dbUser._id,
      });
    } else {
      await this.updateList(body.listId, {
        products: [body.listProduct],
      });
    }
  }

  public async saveModalEditList(body: ListDto, token: AccessTocken) {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User not Exist' });
    await this.updateList(body.listId, {
      name: body.listName,
    });
  }

  public async deleteList(param: any, token: AccessTocken) {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User not Exist' });
    await this.listModel.findByIdAndDelete(param.id);
  }

  public async deleteProductList(param: any, token: AccessTocken) {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User not Exist' });
    const productToDelete =
      await this.productService.getCompletePopulatedProductById(
        param.productId,
      );
    const list = await this.getCompletePopulatedListById(param.listId);
    list.storeTotals.map((storeTotal) => {
      if (storeTotal.store.id === productToDelete.store.id) {
        storeTotal.total -= productToDelete.price;
        storeTotal.total = Number.parseFloat(storeTotal.total.toFixed(2));
      }
    });
    list.storeTotals = list.storeTotals.filter(
      (storeTotal) => storeTotal.total > 0,
    );
    list.total -= productToDelete.price;
    list.total = Number.parseFloat(list.total.toFixed(2));
    list.products = list.products.filter(
      (product) => product.id !== productToDelete.id,
    );
    return await list.save();
  }

  public async createList(createListDto: CreateListDto): Promise<List> {
    const dbList = await this.listModel.findOne({
      name: createListDto.name,
      user: createListDto.user,
    });
    if (dbList)
      throw new BadRequestException({ message: 'List already exist' });
    const totalList = createListDto.products.reduce(
      (sum: number, current: Product) => sum + current.price,
      0,
    );
    const stores = this.spareStoresArray([], createListDto.products);
    stores.map((store) => {
      store.total = this.totalStoreProductList(
        store.store,
        createListDto.products,
      );
    });

    const newList = this.listModel({
      ...createListDto,
      storeTotals: stores,
      total: totalList,
    });
    return await newList.save();
  }

  public async updateList(listId: string, params: any) {
    const dbList = await this.listModel.findById(listId);
    if (!dbList)
      throw new BadRequestException({ message: 'List doesnt exist' });
    if (params.products) {
      if (dbList.products.includes(params.products[0]._id))
        throw new BadRequestException({ message: 'List has this product' });
      dbList.products = dbList.products.concat(
        params.products.map((product) => product._id),
      );
      dbList.total += params.products.reduce(
        (sum, product) => sum + product.price,
        0,
      );
      dbList.total = Number.parseFloat(dbList.total.toFixed(2));
      dbList.storeTotals.map((store) => {
        store.total += this.totalStoreProductList(
          store.store.toString(),
          params.products,
        );
        store.total = Number.parseFloat(store.total.toFixed(2));
      });
      const newStoresList = this.spareStoresArray(
        dbList.storeTotals.map((store) => store.store.toString()),
        params.products,
      );
      newStoresList.map((store) => {
        store.total += this.totalStoreProductList(store.store, params.products);
        store.total = Number.parseFloat(store.total.toFixed(2));
      });
      dbList.storeTotals = dbList.storeTotals.concat(newStoresList);
    }
    if (params.name) dbList.name = params.name;
    return await dbList.save();
  }

  public totalStoreProductList(storeId: string, products: Product[]): Number {
    return products.reduce(
      (sum, product) =>
        storeId === product.store._id ? sum + product.price : sum + 0,
      0,
    );
  }

  public spareStoresArray(stores: string[], products: Product[]): any {
    const unicStoresArray = products.reduce((stores, product) => {
      if (!stores.some((store) => store._id === product.store._id)) {
        stores.push({ store: product.store._id, total: 0 });
      }
      return stores;
    }, []);
    for (let i = 0; i < unicStoresArray.length; i++) {
      if (stores.includes(unicStoresArray[i].store)) {
        unicStoresArray.splice(i, 1);
      }
    }
    return unicStoresArray;
  }

  public async getCompletePopulatedListById(listId: string): Promise<List> {
    return await this.listModel
      .findById(listId)
      .populate([
        { path: 'user' },
        { path: 'products' },
        { path: 'storeTotals.store' },
      ]);
  }

  public async deleteProductToAllLists(
    body: any,
    token: AccessTocken,
  ): Promise<any> {
    const listsList = await this.getAll({ query: {} }, token);

    for (const list of listsList.docs) {
      if (
        list.products.find((product: Product) => product.id === body.productId)
      ) {
        const newProducts = list.products.filter(
          (product: Product) => product.id !== body.productId,
        );
        list.products = newProducts;
        list.storeTotals = this.makeStoreTotals(newProducts);
        list.total = this.calculateTotal(list.storeTotals);
        await list.save();
      }
    }
  }

  public makeStoreTotals(products: Product[]): StoreTotal[] {
    let listStores = products.reduce((acc, product, idx, listP) => {
      let val = product.store._id;
      if (listP.findIndex((product) => product.store._id === val) === idx)
        acc.push(product.store);
      return acc;
    }, [] as Store[]);
    const listStoreTotals = listStores.map((store) => {
      let val = store._id;
      const total = products.reduce((acc, product) => {
        if (product.store._id === val) acc += product.price;
        return formatPrice(acc);
      }, 0);
      return {
        store,
        total,
      };
    });
    return listStoreTotals;
  }

  public calculateTotal(storeTotals: StoreTotal[]): number {
    return storeTotals.reduce(
      (total, store: StoreTotal) => (total += store.total),
      0,
    );
  }
}
