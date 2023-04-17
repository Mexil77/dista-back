import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { ListService } from 'src/list/list.service';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';

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
  ): Promise<any> {
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
    const resList = storeTotalsList.map((storeTotal) => {
      return {
        name: storeTotal.store.name,
        data: [0, 0, 0, storeTotal.total, 0, 0, 0, 0, 0, 0, 0, 0],
      };
    });
    return resList;
  }
}
