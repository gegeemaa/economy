/// <reference types="multer" />
import { InvoiceService } from './invoice.service';
import { Invoice as InvoiceModel } from '@prisma/client';
import { SampleDto } from '../sample.dto';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    getInvoiceById(id: string): Promise<InvoiceModel>;
    getInvoices(): Promise<InvoiceModel[]>;
    createInvoice(invoiceData: {
        name: string;
        fileName: string;
        startDate?: Date;
        endDate?: Date;
        amount: number;
    }): Promise<InvoiceModel>;
    updateInvoice(id: string, data: InvoiceModel): Promise<InvoiceModel>;
    deleteInvoice(id: string): Promise<InvoiceModel>;
    uploadFileAndFailValidation(body: SampleDto, file: Express.Multer.File): {
        filename: string;
    };
}
