import { Schema } from 'mongoose';

import { storeTotal } from 'src/store/schema/store.schema';
import { productTicket } from 'src/product/schemas/product.schema';

export const TicketSchema = new Schema(
  {
    registerDate: { type: Date },
    products: [productTicket],
    user: { type: Schema.Types.ObjectId, ret: 'User' },
    discountRate: { type: Number },
    storeTotals: [storeTotal],
    total: { type: Number },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' },
    toObject: {
      transform: (doc, ret) => {
        return ret;
      },
    },
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);
