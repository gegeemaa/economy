import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { IncomingInvoiceService } from './incomingInvoice.service';
import { IncomingInvoice as IncomingInvoiceModel } from '@prisma/client';

@Controller()
export class IncomingInvoiceController {
  constructor(
    private readonly incomingInvoiceService: IncomingInvoiceService,
  ) {}

  @Get('incomingInvoice/:id')
  async getInvoiceById(@Param('id') id: string): Promise<IncomingInvoiceModel> {
    return this.incomingInvoiceService.invoice({ id: Number(id) });
  }

  @Get('incomingInvoices')
  async getInvoices(): Promise<IncomingInvoiceModel[]> {
    return this.incomingInvoiceService.invoices();
  }
  @Post('incomingInvoice')
  async createInvoice(
    @Body()
    incomingInvoiceData: {
      name: string;
      fileName: string;
      startDate?: Date;
      endDate?: Date;
      amount: number;
    },
  ): Promise<IncomingInvoiceModel> {
    return this.incomingInvoiceService.createInvoice(incomingInvoiceData);
  }

  @Put('updateIncomingInvoice/:id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() data: IncomingInvoiceModel,
  ): Promise<IncomingInvoiceModel> {
    return this.incomingInvoiceService.updateInvoice({
      where: { id: Number(id) },
      data: {
        name: data.name,
        fileName: data.fileName,
        startDate: data.startDate,
        endDate: data.endDate,
        amount: data.amount,
      },
    });
  }

  @Delete('incomingInvoice/:id')
  async deleteInvoice(@Param('id') id: string): Promise<IncomingInvoiceModel> {
    return this.incomingInvoiceService.deleteInvoice({ id: Number(id) });
  }
}
