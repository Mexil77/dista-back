import { Injectable, Inject } from '@nestjs/common';
import { PaginateModel, PaginateOptions } from 'mongoose-paginate';
import { Store } from './interface/store.interface';

@Injectable()
export class StoreService {
  constructor(
    @Inject('StoreModelToken')
    public readonly storeModel: PaginateModel<Store>,
  ) {}

  public async getAll(request: any): Promise<PaginateModel<Store>> {
    const { query } = request;
    const options: PaginateOptions = {
      limit: 100,
      page: 1,
      sort: { createdAt: -1 },
    };
    const searchQuery = { name: query.name };
    const stores = await this.storeModel.paginate({ ...searchQuery }, options);
    return stores;
  }
}
