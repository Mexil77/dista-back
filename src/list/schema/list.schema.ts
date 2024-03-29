import { Schema } from 'mongoose';

import { storeTotal } from 'src/store/schema/store.schema';

export const ListSchema = new Schema(
  {
    name: { type: String },
    kind: { type: String },
    registerDate: { type: Date },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    storeTotals: [storeTotal],
    total: { type: Number },
  },
  {
    timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' },
    toObject: {
      transform: (doc, ret) => {
        return ret;
      },
      virtuals: true,
    },
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);
