import { Document } from 'mongoose';
import { PermissionOprionsEnum } from '../enums/permission-options.enum';
import { UserLenguageEnum } from '../enums/user-lenguage.enum';
import { UserStatusEnum } from '../enums/user-status.enum';

export interface Permissions {
  readonly key: string;
  readonly options: PermissionOprionsEnum[];
}

export interface User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly photo: any;
  readonly status: UserStatusEnum;
  readonly permissions: Permissions[];
  readonly password: string;
  readonly language: UserLenguageEnum;
  readonly created_at: Date;
}
