import { Connection } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { DatabaseProviders } from 'src/common/database/database-providers.enum';
import { UserProviders } from './enums/user-providers.enum';
import { UserSchema } from './schemas/user.schema';

UserSchema.plugin(mongoosePaginate);

export const userProviders = [
  {
    provide: UserProviders.UserModelToken,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DatabaseProviders.DbConnectionTocken],
  },
];
