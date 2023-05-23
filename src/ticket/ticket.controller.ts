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
import { Ticket } from './interface/ticket.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { TicketServise } from './ticket.service';
import { TokenGuard } from 'src/common/guards/token.guard';
import { AccessTocken } from 'src/token/interface/access-token.interface';

@Controller('api/ticket')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class TicketController {
  constructor(private readonly ticketService: TicketServise) {}
  @Get()
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async getAll(
    @Req() request,
    @Token() token: AccessTocken,
  ): Promise<PaginateResults<Ticket>> {
    return await this.ticketService.getAll(request, token);
  }

  @Post('/buy')
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async saveBuy(
    @Body() ticketDto: any,
    @Token() token: AccessTocken,
  ): Promise<any> {
    return await this.ticketService.saveBuy(ticketDto, token);
  }
}
