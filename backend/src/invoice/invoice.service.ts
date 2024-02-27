import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Invoice, Prisma } from '@prisma/client';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async invoice(
    invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput,
  ): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({
      where: invoiceWhereUniqueInput,
    });
  }

  async invoices(): Promise<Invoice[]> {
    return this.prisma.invoice.findMany();
  }

  async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice> {
    return this.prisma.invoice.create({
      data,
    });
  }

  async updateInvoice(params: {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.InvoiceUpdateInput;
  }): Promise<Invoice> {
    const { where, data } = params;
    return this.prisma.invoice.update({
      data,
      where,
    });
  }

  async deleteInvoice(where: Prisma.InvoiceWhereUniqueInput): Promise<Invoice> {
    return this.prisma.invoice.delete({
      where,
    });
  }
}
