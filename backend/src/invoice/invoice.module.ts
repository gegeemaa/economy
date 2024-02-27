import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';

import { PrismaService } from 'src/prisma.service';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [],
  controllers: [InvoiceController],
  // providers: [AppService],
  providers: [PrismaService, InvoiceService],
})
export class InvoiceModule {}
