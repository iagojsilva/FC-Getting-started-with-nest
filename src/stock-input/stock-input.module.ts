import { Module } from '@nestjs/common';
import { StockInputService } from './stock-input.service';
import { StockInputController } from './stock-input.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockInputController],
  providers: [StockInputService],
})
export class StockInputModule {}
