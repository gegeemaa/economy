import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice as InvoiceModel } from '@prisma/client';

import { FileInterceptor } from '@nestjs/platform-express';
import { SampleDto } from '../sample.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('invoice/:id')
  async getInvoiceById(@Param('id') id: string): Promise<InvoiceModel> {
    return this.invoiceService.invoice({ id: Number(id) });
  }

  @Get('invoices')
  async getInvoices(): Promise<InvoiceModel[]> {
    return this.invoiceService.invoices();
  }
  @Post('invoice')
  async createInvoice(
    @Body()
    invoiceData: {
      name: string;
      fileName: string;
      startDate?: Date;
      endDate?: Date;
      amount: number;
    },
  ): Promise<InvoiceModel> {
    return this.invoiceService.createInvoice(invoiceData);
  }

  @Put('updateInvoice/:id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() data: InvoiceModel,
  ): Promise<InvoiceModel> {
    return this.invoiceService.updateInvoice({
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

  @Delete('invoice/:id')
  async deleteInvoice(@Param('id') id: string): Promise<InvoiceModel> {
    return this.invoiceService.deleteInvoice({ id: Number(id) });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadFileAndFailValidation(
    @Body() body: SampleDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(file);
    return { filename: file.filename };
  }

  // @Get(':imgpath')
  // seeUploadedFile(@Param('imgpath') image, @Res() res) {
  //   return res.sendFile(image, { root: './files' });
  // }
}
