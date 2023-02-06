import { Connection } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { ProductSchema } from './schemas/product.schema';
import { DatabaseProviders } from 'src/common/database/database-providers.enum';

ProductSchema.plugin(mongoosePaginate);

export const productCodeProviders = [
  {
    provide: 'ProductModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Product', ProductSchema),
    inject: [DatabaseProviders.DbConnectionTocken],
  },
];
