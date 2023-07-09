import { ConfigService } from '../config/config.service';

const configService = new ConfigService('.env');

export const NetworkConstants = {
  // port: configService.get('PORT'),
  port: process.env.PORT,
};
