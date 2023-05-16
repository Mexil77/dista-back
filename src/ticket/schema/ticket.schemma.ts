import { Schema } from 'mongoose';

import { storeTotal } from 'src/store/schema/store.schema';

const productTicket = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    discountRate: { type: Number },
    quantity: { type: Number },
  },
  { _id: false },
);

export const TicketSchema = new Schema(
  {
    registerDate: { type: Date },
    products: [productTicket],
    user: { type: Schema.Types.ObjectId, ret: 'User' },
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
