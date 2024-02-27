import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IncomingInvoice, Prisma } from '@prisma/client';

@Injectable()
export class IncomingInvoiceService {
  constructor(private prisma: PrismaService) {}

  async invoice(
    incomingInvoiceWhereUniqueInput: Prisma.IncomingInvoiceWhereUniqueInput,
  ): Promise<IncomingInvoice | null> {
    return this.prisma.incomingInvoice.findUnique({
      where: incomingInvoiceWhereUniqueInput,
    });
  }

  async invoices(): Promise<IncomingInvoice[]> {
    return this.prisma.incomingInvoice.findMany();
  }

  async createInvoice(
    data: Prisma.IncomingInvoiceCreateInput,
  ): Promise<IncomingInvoice> {
    return this.prisma.incomingInvoice.create({
      data,
    });
  }

  async updateInvoice(params: {
    where: Prisma.IncomingInvoiceWhereUniqueInput;
    data: Prisma.IncomingInvoiceUpdateInput;
  }): Promise<IncomingInvoice> {
    const { where, data } = params;
    return this.prisma.incomingInvoice.update({
      data,
      where,
    });
  }

  async deleteInvoice(
    where: Prisma.IncomingInvoiceWhereUniqueInput,
  ): Promise<IncomingInvoice> {
    return this.prisma.incomingInvoice.delete({
      where,
    });
  }
}
