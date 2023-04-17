import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ListModule } from 'src/list/list.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UserModule),
    forwardRef(() => ListModule),
  ],
  controllers: [ChartController],
  providers: [ChartService],
  exports: [ChartService],
})
export class ChartModule {}
