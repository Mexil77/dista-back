import * as mongoose from 'mongoose';
import { DatabaseConstants } from '../constants/database.constants';
import { DatabaseProviders } from './database-providers.enum';

export const databaseProviders = [
  {
    provide: DatabaseProviders.DbConnectionTocken,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      await mongoose.connect(DatabaseConstants.uri);
      return mongoose;
    },
  },
];
