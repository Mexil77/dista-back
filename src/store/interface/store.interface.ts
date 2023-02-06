import { Document } from 'mongoose';
import { Product } from 'src/product/interface/product.interface';

export interface Store extends Document {
  readonly _id: string;
  readonly name: string;
  readonly products: Product[];
  readonly photo: any;
}
