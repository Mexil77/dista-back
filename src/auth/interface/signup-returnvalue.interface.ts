import { User } from 'src/user/interface/user.interface';

export interface SignUpReturnValue {
  readonly accessToken: string;
  readonly user: User;
}
