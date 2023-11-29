import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StockOutputService } from './stock-output.service';
import { CreateStockOutputDto } from './dto/create-stock-output.dto';

@Controller('stock-output')
export class StockOutputController {
  constructor(private readonly stockOutputService: StockOutputService) {}

  @Post()
  create(@Body() createStockOutputDto: CreateStockOutputDto) {
    return this.stockOutputService.create(createStockOutputDto);
  }

  @Get()
  findAll() {
    return this.stockOutputService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockOutputService.findOne(+id);
  }
}
