export enum UserRoleEnum {
  admin = 'admin',
  user = 'user',
}

export const UserRoleEnumAsArray: UserRoleEnum[] = Object.keys(
  UserRoleEnum,
) as UserRoleEnum[];
