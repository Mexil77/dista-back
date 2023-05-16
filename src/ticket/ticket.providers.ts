import mongoose, { Connection } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { TicketSchema } from './schema/ticket.schemma';
import { DatabaseProviders } from 'src/common/database/database-providers.enum';

TicketSchema.plugin(mongoosePaginate);

export const ticketCodeProviders = [
  {
    provide: 'TicketModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Ticket', TicketSchema),
    inject: [DatabaseProviders.DbConnectionTocken],
  },
];
