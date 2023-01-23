import { ConfigService } from '../config/config.service';
import { DatabaseConstants } from './database.constants';

const configService = new ConfigService('.env');

export const AuthConstants = {
  cert: {
    privateKey: configService.get('JWT_PRIVATE_KEY'),
    publicKey: configService.get('JWT_PUBLIC_KEY'),
  },
  acessTocken: {
    options: {
      algorith: 'RS256',
      expiresIn: '15min',
      issuer: 'communuty-auth',
    },
  },
  refreshToken: {
    length: 64,
    expiresIn: '1y',
  },
  encryptor: require('simple-encryptor')(DatabaseConstants.encryptot.key),
};
