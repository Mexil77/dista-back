import { Document } from 'mongoose';
import { Product } from 'src/product/interface/product.interface';
import { User } from 'src/user/interface/user.interface';
import { Store } from 'src/store/interface/store.interface';

export interface StoreTotal {
  store: Store;
  total: number;
}

export interface List extends Document {
  readonly _id: string;
  readonly name: string;
  readonly user: User;
  readonly registerDate: Date;
  products?: Product[];
  storeTotals: StoreTotal[];
  total: number;
}
