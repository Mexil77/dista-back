import { Connection } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { ListSchema } from './schema/list.schema';
import { DatabaseProviders } from 'src/common/database/database-providers.enum';

ListSchema.plugin(mongoosePaginate);

export const listCodeProviders = [
  {
    provide: 'ListModelToken',
    useFactory: (connection: Connection) =>
      connection.model('List', ListSchema),
    inject: [DatabaseProviders.DbConnectionTocken],
  },
];
