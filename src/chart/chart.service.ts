import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { ListService } from 'src/list/list.service';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';
import { ChartData } from './interface/chart.Interface';
import { Product } from 'src/product/interface/product.interface';
import { List, StoreTotal } from 'src/list/interface/list.interface';
import { Store } from 'src/store/interface/store.interface';

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
  ): Promise<ChartData[]> {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Exist' });
    const buyLists = await this.listService.getAll(
      { query: { kind: 'buy' } },
      token,
    );
    const storeTotalsList = buyLists.docs.reduce(
      (acc: StoreTotal[], list: List) => {
        list.storeTotals.map((storeTotal: StoreTotal) => {
          acc.push(storeTotal);
        });
        return acc;
      },
      [],
    );
    const filteredChartData = storeTotalsList.reduce(
      (
        acc: ChartData[],
        storeTotal: StoreTotal,
        idx: number,
        storeTotalList: StoreTotal[],
      ) => {
        let val = storeTotal.store._id;
        if (
          storeTotalList.findIndex(
            (storeTotal) => storeTotal.store._id === val,
          ) === idx
        )
          acc.push({
            name: storeTotal.store.name,
            id: storeTotal.store._id,
            color: storeTotal.store.color,
          });
        return acc;
      },
      [],
    );
    const chartData = filteredChartData.map((store: ChartData) => {
      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      buyLists.docs.map((buy: List) => {
        const idx = new Date(buy.registerDate).getMonth();
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
    return chartData;
  }

  public async getProductsPerStoreTotalChart(
    request: any,
    token: AccessTocken,
  ): Promise<ChartData[]> {
    const { query } = request;
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Exist' });
    const buyLists = await this.listService.getAll(
      { query: { kind: 'buy' } },
      token,
    );
    const productsList = buyLists.docs.reduce((acc: Product[], list: List) => {
      list.products.map((product: Product) => {
        if (product.store.toString() === query.id) {
          acc.push(product);
        }
      });
      return acc;
    }, []);
    const filteredChartData = productsList.reduce(
      (
        acc: ChartData[],
        product: Product,
        idx: number,
        productL: Product[],
      ) => {
        let val = product.id;
        if (productL.findIndex((product) => product.id === val) === idx)
          acc.push({
            name: product.name,
            id: product.id,
            color: product.color,
          });
        return acc;
      },
      [],
    );
    const chartData = filteredChartData.map((product: ChartData) => ({
      id: product.id,
      name: product.name,
      color: product.color,
      data: [
        productsList.reduce(
          (acc: number, productR: Product) =>
            product.name === productR.name ? (acc += productR.price) : acc,
          0,
        ),
      ],
    }));
    return chartData;
  }
}
