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

export const StoreSchema = new Schema(
  {
    name: { type: String },
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
