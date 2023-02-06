import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productCodeProviders } from './product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productCodeProviders],
  exports: [ProductService],
})
export class ProductModule {}
