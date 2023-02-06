import { Controller, UseFilters, Get, Req } from '@nestjs/common';
import { TokenRequirements } from 'src/common/decorators/tocken-requirements.decorator';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { PaginateResults } from 'mongoose-paginate';
import { Store } from './interface/store.interface';
import { StoreService } from './store.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';

@Controller('api/store')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Get()
  @TokenRequirements([TokenTypeEnums.user])
  public async getAll(@Req() request): Promise<PaginateResults<Store>> {
    return await this.storeService.getAll(request);
  }
}
