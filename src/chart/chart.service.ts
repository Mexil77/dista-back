import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { generateRandomColor } from 'src/common/utils/color';
import { ListService } from 'src/list/list.service';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';
import { ChartStores } from './interface/chart.Interface';

@Injectable()
export class ChartService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ListService))
    private readonly listService: ListService,
  ) {}

  public async getStoresTotalsChart(
    request: any,
    token: AccessTocken,
  ): Promise<ChartStores[]> {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Exist' });
    const buyLists = await this.listService.getAll(
      { query: { kind: 'buy' } },
      token,
    );
    const storeTotalsList = buyLists.docs.reduce((acc, list) => {
      list.storeTotals.map((store) => {
        acc.push(store);
      });
      return acc;
    }, []);
    const unicStores = storeTotalsList.reduce((acc, store, idx, storeL) => {
      let val = store.store._id;
      if (storeL.findIndex((store) => store.store._id === val) === idx)
        acc.push({
          name: store.store.name,
          id: store.store._id,
          color: store.store.color,
        });
      return acc;
    }, []);
    const resList = unicStores.map((store) => {
      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      buyLists.docs.map((buy) => {
        const idx = new Date(buy.createAt).getMonth();
        let storeTotalFinded = buy.storeTotals.find(
          (storeT) => storeT.store.name === store.name,
        );
        if (storeTotalFinded) data[idx] += storeTotalFinded.total;
      });
      return {
        id: store.id,
        name: store.name,
        color: store.color,
        data,
      };
    });
    return resList;
  }

  public async getProductsPerStoreTotalChart(
    request: any,
    token: AccessTocken,
  ): Promise<any> {
    const { query } = request;
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Exist' });
    const buyLists = await this.listService.getAll(
      { query: { kind: 'buy' } },
      token,
    );
    const productsList = buyLists.docs.reduce((acc, list) => {
      list.products.map((product) => {
        if (product.store.toString() === query.id) {
          acc.push(product);
        }
      });
      return acc;
    }, []);
    const unicProducts = productsList.reduce((acc, product, idx, productL) => {
      let val = product.id;
      if (productL.findIndex((product) => product.id === val) === idx)
        acc.push({ name: product.name, id: product.id, color: product.color });
      return acc;
    }, []);
    const productTotalSpended = unicProducts.map((product) => ({
      id: product.id,
      name: product.name,
      color: product.color,
      data: [
        productsList.reduce(
          (acc, productR) =>
            product.name === productR.name ? (acc += productR.price) : acc,
          0,
        ),
      ],
    }));
    return productTotalSpended;
  }
}
