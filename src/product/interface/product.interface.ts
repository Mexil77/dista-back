import { Document } from 'mongoose';
import { Store } from 'src/store/interface/store.interface';
import { User } from 'src/user/interface/user.interface';

export interface Product extends Document {
  readonly _id: string;
  readonly name: string;
  readonly price: number;
  readonly units: number;
  readonly typeUnit: string;
  readonly description: string;
  readonly user: User;
  readonly store?: Store;
  readonly photo?: any;
}
