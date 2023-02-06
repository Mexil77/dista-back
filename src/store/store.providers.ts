import { Connection } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { StoreSchema } from './schema/store.schema';
import { DatabaseProviders } from 'src/common/database/database-providers.enum';

StoreSchema.plugin(mongoosePaginate);

export const storeCodeProviders = [
  {
    provide: 'StoreModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Store', StoreSchema),
    inject: [DatabaseProviders.DbConnectionTocken],
  },
];
