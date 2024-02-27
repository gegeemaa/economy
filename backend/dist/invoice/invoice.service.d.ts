import { PrismaService } from '../prisma.service';
import { Invoice, Prisma } from '@prisma/client';
export declare class InvoiceService {
    private prisma;
    constructor(prisma: PrismaService);
    invoice(invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput): Promise<Invoice | null>;
    invoices(): Promise<Invoice[]>;
    createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice>;
    updateInvoice(params: {
        where: Prisma.InvoiceWhereUniqueInput;
        data: Prisma.InvoiceUpdateInput;
    }): Promise<Invoice>;
    deleteInvoice(where: Prisma.InvoiceWhereUniqueInput): Promise<Invoice>;
}
