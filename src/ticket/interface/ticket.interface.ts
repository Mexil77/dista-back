import { Document } from 'mongodb';
import { ProductTicket } from 'src/product/interface/product.interface';
import { User } from 'src/user/interface/user.interface';
import { StoreTotal } from 'src/store/interface/store.interface';

export interface Ticket extends Document {
  readonly _id: string;
  readonly user: User;
  readonly registerDate: Date;
  readonly discountRate: number;
  products?: ProductTicket[];
  storeTotals: StoreTotal[];
  total: number;
}
