import { Module, forwardRef } from '@nestjs/common';
import { StoreModule } from 'src/store/store.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { FormController } from './form.controller';
import { FormService } from './form.service';

@Module({
  imports: [
    forwardRef(() => StoreModule),
    forwardRef(() => ProductModule),
    forwardRef(() => UserModule),
  ],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}
