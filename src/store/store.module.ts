import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { storeCodeProviders } from './store.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [StoreController],
  providers: [StoreService, ...storeCodeProviders],
  exports: [StoreService],
})
export class StoreModule {}
