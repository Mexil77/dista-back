import { Controller, UseFilters, Post, Body, UseGuards } from '@nestjs/common';
import { TokenRequirements } from 'src/common/decorators/tocken-requirements.decorator';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { FormService } from './form.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { FormDto } from './dto/form.dto';
import { Token } from 'src/common/decorators/token.decorator';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { TokenGuard } from 'src/common/guards/token.guard';

@Controller('api/form')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class FormController {
  constructor(private readonly formService: FormService) {}
  @Post()
  @TokenRequirements([TokenTypeEnums.user])
  @UseGuards(TokenGuard)
  public async createForm(
    @Body() formDto: FormDto,
    @Token() token: AccessTocken,
  ): Promise<any> {
    return await this.formService.createForm(formDto, token);
  }
}
