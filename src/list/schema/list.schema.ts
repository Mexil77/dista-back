import { Schema } from 'mongoose';

const storeTotal = new Schema(
  {
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    total: { type: Number },
  },
  { _id: false },
);

export const ListSchema = new Schema(
  {
    name: { type: String },
    kind: { type: String },
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
