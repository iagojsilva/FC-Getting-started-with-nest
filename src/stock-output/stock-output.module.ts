import { Module } from '@nestjs/common';
import { StockOutputService } from './stock-output.service';
import { StockOutputController } from './stock-output.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockOutputController],
  providers: [StockOutputService],
})
export class StockOutputModule {}
