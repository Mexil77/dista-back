import { TokenTypeEnums } from '../enums/token-type.enums';

export interface AccessTocken {
  readonly uid: string;
  readonly sub: string;
  readonly type: TokenTypeEnums;
  readonly rs?: string[];
}
