import { PermissionOprionsEnum } from './permission-options.enum';
import { UserRoleEnum } from './user-role.enum';

export enum ModulesKeyEnum {
  dashboard = 'dasboard',
  product = 'product',
  store = 'store',
}

export const ModulesKeyEnumAsArray = Object.keys(ModulesKeyEnum);

export const ModulesKeyByRole = [
  {
    role: UserRoleEnum.admin,
    modules: [
      {
        key: ModulesKeyEnum.dashboard,
        options: [
          PermissionOprionsEnum.view,
          PermissionOprionsEnum.create,
          PermissionOprionsEnum.delete,
          PermissionOprionsEnum.edit,
        ],
      },
      {
        key: ModulesKeyEnum.product,
        options: [
          PermissionOprionsEnum.view,
          PermissionOprionsEnum.create,
          PermissionOprionsEnum.delete,
          PermissionOprionsEnum.edit,
        ],
      },
      {
        key: ModulesKeyEnum.store,
        options: [
          PermissionOprionsEnum.view,
          PermissionOprionsEnum.create,
          PermissionOprionsEnum.delete,
          PermissionOprionsEnum.edit,
        ],
      },
    ],
  },
  {
    role: UserRoleEnum.user,
    modules: [
      {
        key: ModulesKeyEnum.dashboard,
        options: [
          PermissionOprionsEnum.view,
          PermissionOprionsEnum.create,
          PermissionOprionsEnum.delete,
          PermissionOprionsEnum.edit,
        ],
      },
      {
        key: ModulesKeyEnum.product,
        options: [
          PermissionOprionsEnum.view,
          PermissionOprionsEnum.create,
          PermissionOprionsEnum.delete,
          PermissionOprionsEnum.edit,
        ],
      },
      {
        key: ModulesKeyEnum.store,
        options: [
          PermissionOprionsEnum.view,
          PermissionOprionsEnum.create,
          PermissionOprionsEnum.delete,
          PermissionOprionsEnum.edit,
        ],
      },
    ],
  },
];
