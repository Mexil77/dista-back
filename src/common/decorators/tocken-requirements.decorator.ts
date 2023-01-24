import { SetMetadata } from '@nestjs/common';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { ModulesKeyEnum } from 'src/user/enums/modules-key.enum';
import { PermissionOprionsEnum } from 'src/user/enums/permission-options.enum';
import { Permissions } from 'src/user/interface/user.interface';

export const TokenRequirements = (
  requiredTokenType: TokenTypeEnums[],
  requiredUserpermissions?: ModulesKeyEnum[],
  requiredPermissionOptions?: PermissionOprionsEnum[],
) =>
  SetMetadata(
    'tokenrequirements',
    new TokenRequirementsHelper(
      requiredTokenType,
      requiredUserpermissions,
      requiredPermissionOptions,
    ),
  );

export class TokenRequirementsHelper {
  private requiredTokenType: TokenTypeEnums[];
  public requiredUserpermissions: ModulesKeyEnum[];
  public requiredPermissionOptions: PermissionOprionsEnum[];

  constructor(
    requiredTokenType: TokenTypeEnums[],
    requiredUserpermissions: ModulesKeyEnum[],
    requiredPermissionOptions: PermissionOprionsEnum[],
  ) {
    this.requiredTokenType = requiredTokenType;
    this.requiredUserpermissions = requiredUserpermissions;
    this.requiredPermissionOptions = requiredPermissionOptions;
  }
  public tokenIsOfTyoe(tokenType: TokenTypeEnums): boolean {
    return this.requiredTokenType.some(
      (requiredType) => tokenType === requiredType,
    );
  }
  public tockenHasAllPermissionOptions(
    userPermissions: Permissions[],
  ): boolean {
    if (this.requiredUserpermissions) {
      return this.requiredUserpermissions.some((required) =>
        userPermissions.some((up) => up.key === required),
      );
    }
    return true;
  }
  public tokenHasAllPermissionOptions(
    permissionOptions: Permissions[],
  ): boolean {
    if (this.requiredPermissionOptions) {
      let permitted = false;
      this.requiredUserpermissions.forEach((rp) => {
        const permission = permissionOptions.find((po) => po.key === rp);
        if (permission) {
          const isValid = permission.options.some(
            (o) => this.requiredPermissionOptions.indexOf(o) >= 0,
          );
          if (isValid) {
            permitted = true;
          }
        }
      });
      return permitted;
    }
    return true;
  }
}
