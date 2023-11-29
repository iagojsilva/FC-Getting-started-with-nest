import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { StockInputModule } from './stock-input/stock-input.module';
import { StockOutputModule } from './stock-output/stock-output.module';

@Module({
  imports: [ProductsModule, PrismaModule, StockInputModule, StockOutputModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
