import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { FormModule } from './form/form.module';
import { ListModule } from './list/list.module';
import { ChartModule } from './chart/chart.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    StoreModule,
    FormModule,
    ListModule,
    ChartModule,
    TicketModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
