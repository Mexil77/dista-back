import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productCodeProviders } from './product.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [ProductController],
  providers: [ProductService, ...productCodeProviders],
  exports: [ProductService],
})
export class ProductModule {}
