import { Test, TestingModule } from '@nestjs/testing';
import { StockInputController } from './stock-input.controller';
import { StockInputService } from './stock-input.service';

describe('StockInputController', () => {
  let controller: StockInputController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockInputController],
      providers: [StockInputService],
    }).compile();

    controller = module.get<StockInputController>(StockInputController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
