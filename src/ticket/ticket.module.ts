import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { TicketController } from './ticket.controller';
import { TicketServise } from './ticket.service';
import { ticketCodeProviders } from './ticket.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [TicketController],
  providers: [TicketServise, ...ticketCodeProviders],
  exports: [TicketServise],
})
export class TicketModule {}
