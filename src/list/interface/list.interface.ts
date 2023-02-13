import { Document } from 'mongoose';
import { Product } from 'src/product/interface/product.interface';
import { User } from 'src/user/interface/user.interface';

export interface List extends Document {
  readonly _id: string;
  readonly name: string;
  readonly products?: Product[];
  readonly user: User;
}
