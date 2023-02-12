import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { listCodeProviders } from './list.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [ListController],
  providers: [ListService, ...listCodeProviders],
  exports: [ListService],
})
export class ListModule {}
