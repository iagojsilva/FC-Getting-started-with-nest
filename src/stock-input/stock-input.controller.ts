import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockInputService } from './stock-input.service';
import { CreateStockInputDto } from './dto/create-stock-input.dto';

@Controller('stock-input')
export class StockInputController {
  constructor(private readonly stockInputService: StockInputService) {}

  @Post()
  create(@Body() createStockInputDto: CreateStockInputDto) {
    return this.stockInputService.create(createStockInputDto);
  }

  @Get()
  findAll() {
    return this.stockInputService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockInputService.findOne(+id);
  }
}
