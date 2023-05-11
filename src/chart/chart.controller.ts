import { Controller, UseFilters, Get, UseGuards, Req } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { ChartService } from './chart.service';
import { TokenRequirements } from 'src/common/decorators/tocken-requirements.decorator';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { TokenGuard } from 'src/common/guards/token.guard';
import { Token } from 'src/common/decorators/token.decorator';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { ChartData } from './interface/chart.Interface';

@Controller('api/chart')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class ChartController {
  constructor(private readonly chartService: ChartService) {}
  @Get('storesTotalsChart')
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async getStoresTotalsChart(
    @Req() request,
    @Token() token: AccessTocken,
  ): Promise<ChartData[]> {
    return await this.chartService.getStoresTotalsChart(request, token);
  }

  @Get('getProductsPerStoreTotalChart')
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async getProductsPerStoreTotalChart(
    @Req() request,
    @Token() token: AccessTocken,
  ): Promise<ChartData[]> {
    return await this.chartService.getProductsPerStoreTotalChart(
      request,
      token,
    );
  }
}
