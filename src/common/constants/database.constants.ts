import { ConfigService } from '../config/config.service';

const configService = new ConfigService('.env');

export const DatabaseConstants = {
  uri: configService.get('MONGO_URI'),
  encryptot: {
    key: 'ZhsgKYjI5WE4fbuOOyiCSkwqObGpnmaJ',
  },
};
