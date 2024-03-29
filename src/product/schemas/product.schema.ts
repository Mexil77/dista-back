import { Schema } from 'mongoose';
import {
  ProductStatusEnum,
  ProductStatusEnumAsArray,
} from '../enums/product-status.enum';

const PhotoSchema = new Schema(
  {
    name: { type: String },
    url: { type: String },
  },
  { _id: false },
);

export const productTicket = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    discountRate: { type: Number },
    quantity: { type: Number },
    totalTicketProduct: { type: Number },
  },
  { _id: false },
);

export const ProductSchema = new Schema(
  {
    status: {
      type: String,
      enum: ProductStatusEnumAsArray,
      default: ProductStatusEnum.active,
    },
    name: { type: String },
    price: { type: Number },
    units: { type: Number },
    typeUnit: { type: String },
    description: { type: String },
    color: { type: String },
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
