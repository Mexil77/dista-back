import { Schema } from 'mongoose';
import { AuthConstants } from 'src/common/constants/auth.constatns';
import { UserLenguageEnumAsArray } from '../enums/user-lenguage.enum';
import { UserStatusEnumAsArray } from '../enums/user-status.enum';
import { User } from '../interface/user.interface';

const PhotoSchema = new Schema(
  {
    name: { type: String },
    url: { type: String },
  },
  {
    _id: false,
  },
);

const PermissionsSchema = new Schema(
  {
    key: { type: String },
    options: [{ type: String }],
  },
  {
    _id: false,
  },
);

export const UserSchema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    photo: PhotoSchema,
    status: { type: String, required: true, enum: UserStatusEnumAsArray },
    permission: [PermissionsSchema],
    password: { type: String, select: false, required: true },
    language: { type: String, enum: UserLenguageEnumAsArray },
    phone: { type: String },
    search: { type: [String] },
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
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  },
);

UserSchema.pre('save', async function () {
  const password = this.get('password');
  const email = this.get('email');
  if (password && this.isModified('password')) {
    const hash = AuthConstants.encryptor.encrypt(password);
    this.set('password', hash);
  }
});

UserSchema.index({ search: 'text', tags: 'text' });

// UserSchema.pre('save', async function () {
//   const { name, lastName, email } = this as User;
//   const search = [name, email];
//   if (lastName) search.push(lastName);
//   this.set('search', search);
// });
