import { Schema } from 'mongoose';

export const ListSchema = new Schema(
  {
    name: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
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
