import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';
import { ListService } from 'src/list/list.service';
import { TicketServise } from 'src/ticket/ticket.service';
import { ChartData } from './interface/chart.Interface';
import {
  Product,
  ProductTicket,
} from 'src/product/interface/product.interface';
import { List } from 'src/list/interface/list.interface';
import { StoreTotal } from 'src/store/interface/store.interface';
import { Ticket } from 'src/ticket/interface/ticket.interface';

@Injectable()
export class ChartService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ListService))
    private readonly listService: ListService,
    @Inject(forwardRef(() => TicketServise))
    private readonly ticketServise: TicketServise,
  ) {}

  public async getStoresTotalsChart(
    request: any,
    token: AccessTocken,
  ): Promise<ChartData[]> {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Exist' });
    const tickets = await this.ticketServise.getAll({}, token);
    const storeTotalsList = tickets.docs.reduce(
      (acc: StoreTotal[], ticket: Ticket) => {
        ticket.storeTotals.map((storeTotal: StoreTotal) => {
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
      tickets.docs.map((ticket: Ticket) => {
        const idx = new Date(ticket.registerDate).getMonth();
        let storeTotalFinded = ticket.storeTotals.find(
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
    const tickets = await this.ticketServise.getAll({}, token);
    const productsTicketList = tickets.docs.reduce(
      (acc: ProductTicket[], ticket: Ticket) => {
        ticket.products.map((productTicket: ProductTicket) => {
          if (productTicket.product.store.id === query.id) {
            acc.push(productTicket);
          }
        });
        return acc;
      },
      [],
    );
    const filteredChartData = productsTicketList.reduce(
      (
        acc: ChartData[],
        productTicket: ProductTicket,
        idx: number,
        productTicketL: ProductTicket[],
      ) => {
        let val = productTicket.product.id;
        if (
          productTicketL.findIndex(
            (productTicket) => productTicket.product.id === val,
          ) === idx
        )
          acc.push({
            name: productTicket.product.name,
            id: productTicket.product.id,
            color: productTicket.product.color,
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
        productsTicketList.reduce(
          (acc: number, productTicketR: ProductTicket) =>
            product.name === productTicketR.product.name
              ? (acc += productTicketR.totalTicketProduct)
              : acc,
          0,
        ),
      ],
    }));
    return chartData;
  }
}
