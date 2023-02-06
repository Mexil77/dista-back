import { Document } from 'mongoose';
import { Store } from 'src/store/interface/store.interface';

export interface Product extends Document {
  readonly _id: string;
  readonly name: string;
  readonly price: number;
  readonly store: Store;
  readonly photo: any;
}
