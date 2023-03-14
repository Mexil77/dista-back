import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { List } from './interface/list.interface';
// import { CreateListDto } from './dto/create-list.dto';
import { ListDto } from './dto/list.dto';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserService } from 'src/user/user.service';
import { CreateListDto } from './dto/create-list.dto';

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
      populate: [{ path: 'products' }],
    };

    const { query } = request;
    const searchQuery = { user: dbUser._id };

    const lists = await this.listModel.paginate({ ...searchQuery }, options);
    return lists;
  }

  public async saveModalAddList(body: ListDto, token: AccessTocken) {
    const dbUser = await this.userService.findById(token.uid);
    if (!dbUser) throw new BadRequestException({ message: 'User not Exist' });
    if (body.listState) {
      await this.createList({
        name: body.listName,
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

  public async createList(createListDto: CreateListDto): Promise<List> {
    const dbList = await this.listModel.findOne({
      name: createListDto.name,
      user: createListDto.user,
    });
    if (dbList)
      throw new BadRequestException({ message: 'List already exist' });
    const newList = this.listModel(createListDto);
    return await newList.save();
  }

  public async updateList(listId: string, params: any): Promise<List> {
    const dbList = await this.listModel.findById(listId);
    if (!dbList)
      throw new BadRequestException({ message: 'List doesnt exist' });
    if (params.products) {
      if (dbList.products.includes(params.products[0]))
        throw new BadRequestException({ message: 'List has this product' });
      dbList.products = dbList.products.concat(params.products);
    }
    if (params.name) dbList.name = params.name;
    return await dbList.save();
  }
}
