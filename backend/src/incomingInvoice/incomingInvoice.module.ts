import { Module } from '@nestjs/common';
import { IncomingInvoiceController } from './incomingInvoice.controller';

import { PrismaService } from 'src/prisma.service';
import { IncomingInvoiceService } from './incomingInvoice.service';

@Module({
  imports: [],
  controllers: [IncomingInvoiceController],
  // providers: [AppService],
  providers: [PrismaService, IncomingInvoiceService],
})
export class IncomingInvoiceModule {}
