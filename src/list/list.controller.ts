import {
  UseGuards,
  Controller,
  UseFilters,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  Param,
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
import { CreateListDto } from './dto/create-list.dto';

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

  @Post('/buy')
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async saveBuy(
    @Body() listDto: CreateListDto,
    @Token() token: AccessTocken,
  ): Promise<any> {
    return await this.listService.saveBuy(listDto, token);
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

  @Post('/edit-list')
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async saveModalEditList(
    @Body() listDto: ListDto,
    @Token() token: AccessTocken,
  ): Promise<any> {
    return await this.listService.saveModalEditList(listDto, token);
  }

  @Delete('/:id')
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async deleteList(
    @Param() param,
    @Token() token: AccessTocken,
  ): Promise<any> {
    return await this.listService.deleteList(param, token);
  }

  @Delete('/:listId/:productId')
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async deleteProductList(
    @Param() param,
    @Token() token: AccessTocken,
  ): Promise<any> {
    return await this.listService.deleteProductList(param, token);
  }

  @Put()
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async deleteProductToAllLists(
    @Body() body: any,
    @Token() token: AccessTocken,
  ): Promise<any> {
    return await this.listService.deleteProductToAllLists(body, token);
  }

  @Post('/totals')
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async updateTotalsList(
    @Token() token: AccessTocken,
    @Body() body: any,
  ) {
    return await this.listService.recalculateAllTotalsLists(token);
  }
}
