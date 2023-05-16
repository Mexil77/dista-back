import { Schema } from 'mongoose';

const PhotoSchema = new Schema(
  {
    name: { type: String },
    url: { type: String },
  },
  {
    _id: false,
  },
);

export const storeTotal = new Schema(
  {
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    total: { type: Number },
  },
  { _id: false },
);

export const StoreSchema = new Schema(
  {
    name: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    color: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    photo: PhotoSchema,
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
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
