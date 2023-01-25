import { User } from 'src/user/interface/user.interface';

export interface SignInReturnValue {
  readonly accessToken: string;
  readonly user: User;
}
