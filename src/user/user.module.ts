import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserController } from './user.controller';
import { UserGateway } from './user.gateway';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, UserGateway],
  exports: [UserService],
})
export class UserModule {}
