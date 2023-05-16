import { Document } from 'mongodb';
import { ProductTiket } from 'src/product/interface/product.interface';
import { User } from 'src/user/interface/user.interface';
import { StoreTotal } from 'src/store/interface/store.interface';

export interface Ticket extends Document {
  readonly _id: string;
  readonly user: User;
  readonly registerDate: Date;
  products?: ProductTiket[];
  storeTotals: StoreTotal[];
  total: number;
}
