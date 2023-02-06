import { Schema } from 'mongoose';

const PhotoSchema = new Schema(
  {
    name: { type: String },
    url: { type: String },
  },
  { _id: false },
);

export const ProductSchema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
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
