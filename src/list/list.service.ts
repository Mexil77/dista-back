import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { List } from './interface/list.interface';
// import { CreateListDto } from './dto/create-list.dto';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ListService {
  constructor(
    @Inject('ListModelToken')
    public readonly listModel: PaginateModel<List>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
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
      //populate: [],
    };

    const { query } = request;
    const searchQuery = { user: dbUser._id };

    const products = await this.listModel.paginate({ ...searchQuery }, options);
    return products;
  }
}
