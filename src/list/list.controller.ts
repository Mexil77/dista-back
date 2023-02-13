import {
  UseGuards,
  Controller,
  UseFilters,
  Get,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { TokenRequirements } from 'src/common/decorators/tocken-requirements.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { PaginateResults } from 'mongoose-paginate';
import { List } from './interface/list.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { ListService } from './list.service';
import { TokenGuard } from 'src/common/guards/token.guard';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { ListDto } from './dto/list.dto';

@Controller('api/list')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class ListController {
  constructor(private readonly listService: ListService) {}
  @Get()
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async getAll(
    @Req() request,
    @Token() token: AccessTocken,
  ): Promise<PaginateResults<List>> {
    return await this.listService.getAll(request, token);
  }

  @Post()
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async saveModalAddList(
    @Body() listDto: ListDto,
    @Token() token: AccessTocken,
  ): Promise<any> {
    return await this.listService.saveModalAddList(listDto, token);
  }
}
