export enum UserStatusEnum {
  active = 'active',
  inactive = 'inactive',
  delete = 'delete',
  pendingEmail = 'pendingEmail',
  pendingConfirm = 'pendignConfirm',
}

export const UserStatusEnumAsArray = Object.keys(UserStatusEnum);
