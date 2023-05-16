import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { TicketController } from './ticket.controller';
import { Ticketservise } from './ticket.service';
import { ticketCodeProviders } from './ticket.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [TicketController],
  providers: [Ticketservise, ...ticketCodeProviders],
  exports: [Ticketservise],
})
export class TicketModule {}
