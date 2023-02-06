import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [AuthModule, ProductModule, StoreModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
