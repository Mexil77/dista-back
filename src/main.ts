import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NetworkConstants } from './common/constants/network.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(NetworkConstants.port);
}
bootstrap();
