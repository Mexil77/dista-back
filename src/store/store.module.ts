import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { storeCodeProviders } from './store.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [StoreService, ...storeCodeProviders],
  exports: [StoreService],
})
export class StoreModule {}
