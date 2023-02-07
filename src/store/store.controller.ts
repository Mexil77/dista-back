import { UseGuards, Controller, UseFilters, Get, Req } from '@nestjs/common';
import { TokenRequirements } from 'src/common/decorators/tocken-requirements.decorator';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { PaginateResults } from 'mongoose-paginate';
import { Store } from './interface/store.interface';
import { StoreService } from './store.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { Token } from 'src/common/decorators/token.decorator';
import { TokenGuard } from 'src/common/guards/token.guard';
import { AccessTocken } from 'src/token/interface/access-token.interface';

@Controller('api/store')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Get()
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async getAll(
    @Req() request,
    @Token() token: AccessTocken,
  ): Promise<PaginateResults<Store>> {
    return await this.storeService.getAll(request, token);
  }
}
