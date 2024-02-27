import { IncomingInvoiceService } from './incomingInvoice.service';
import { IncomingInvoice as IncomingInvoiceModel } from '@prisma/client';
export declare class IncomingInvoiceController {
    private readonly incomingInvoiceService;
    constructor(incomingInvoiceService: IncomingInvoiceService);
    getInvoiceById(id: string): Promise<IncomingInvoiceModel>;
    getInvoices(): Promise<IncomingInvoiceModel[]>;
    createInvoice(incomingInvoiceData: {
        name: string;
        fileName: string;
        startDate?: Date;
        endDate?: Date;
        amount: number;
    }): Promise<IncomingInvoiceModel>;
    updateInvoice(id: string, data: IncomingInvoiceModel): Promise<IncomingInvoiceModel>;
    deleteInvoice(id: string): Promise<IncomingInvoiceModel>;
}
