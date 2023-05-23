import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { Ticket } from './interface/ticket.interface';
import { UserService } from 'src/user/user.service';
import { AccessTocken } from 'src/token/interface/access-token.interface';

@Injectable()
export class TicketServise {
  constructor(
    @Inject('TicketModelToken')
    public readonly ticketModel: PaginateModel<Ticket>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async getAll(
    request: any,
    token: AccessTocken,
  ): Promise<PaginateModel<Ticket>> {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User Not Exist' });
    const options: PaginateOptions = {
      limit: 100,
      page: 1,
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'products',
          populate: { path: 'product', populate: { path: 'store' } },
        },
        { path: 'storeTotals.store' },
      ],
    };
    // const { query } = request; pending params
    const searchQuery = { user: dbUser._id };
    const tickets = await this.ticketModel.paginate(
      { ...searchQuery },
      options,
    );
    return tickets;
  }

  public async saveBuy(body: any, token: AccessTocken) {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User not Exist' });
    const newList = this.ticketModel({
      ...body,
      user: dbUser._id,
    });
    return await newList.save();
  }
}
