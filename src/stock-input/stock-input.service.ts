import { Injectable } from '@nestjs/common';
import { CreateStockInputDto } from './dto/create-stock-input.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isNil } from 'lodash';
import { NotFoundError } from 'src/errors';

@Injectable()
export class StockInputService {
  constructor(private readonly _prismaService: PrismaService) {}
  public async create({ productID, quantity, date }: CreateStockInputDto) {
    const { stockInput, product } = this._prismaService;
    const fetchedProduct = await product.findUnique({
      where: { id: productID },
    });

    if (isNil(fetchedProduct)) {
      throw new NotFoundError(`Cannot find product with ID: ${productID}`);
    }

    const createStockInputOP = stockInput.create({
      data: { productID, quantity, date },
    });

    const updateProductOP = product.update({
      where: { id: productID },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });

    const [createdStocked] = await this._prismaService.$transaction([
      createStockInputOP,
      updateProductOP,
    ]);

    return createdStocked;
  }

  findAll() {
    return this._prismaService.stockInput.findMany({});
  }

  async findOne(id: number) {
    try {
      return await this._prismaService.stockInput.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError(`Cannot find stock input with ID: ${id}`);
      }
      throw error;
    }
  }
}
