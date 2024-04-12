import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { InvoiceModule } from './invoice/invoice.module';
import { IncomingInvoiceModule } from './incomingInvoice/incomingInvoice.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    InvoiceModule,
    IncomingInvoiceModule,
    MulterModule.register({ dest: './files' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      exclude: ['/api/(.*)'],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  // providers: [AppService],
  providers: [PrismaService],
})
export class AppModule {}
