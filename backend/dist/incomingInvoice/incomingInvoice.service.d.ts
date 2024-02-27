import { PrismaService } from '../prisma.service';
import { IncomingInvoice, Prisma } from '@prisma/client';
export declare class IncomingInvoiceService {
    private prisma;
    constructor(prisma: PrismaService);
    invoice(incomingInvoiceWhereUniqueInput: Prisma.IncomingInvoiceWhereUniqueInput): Promise<IncomingInvoice | null>;
    invoices(): Promise<IncomingInvoice[]>;
    createInvoice(data: Prisma.IncomingInvoiceCreateInput): Promise<IncomingInvoice>;
    updateInvoice(params: {
        where: Prisma.IncomingInvoiceWhereUniqueInput;
        data: Prisma.IncomingInvoiceUpdateInput;
    }): Promise<IncomingInvoice>;
    deleteInvoice(where: Prisma.IncomingInvoiceWhereUniqueInput): Promise<IncomingInvoice>;
}
