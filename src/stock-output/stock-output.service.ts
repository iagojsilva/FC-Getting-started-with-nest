import { Injectable } from '@nestjs/common';
import { CreateStockOutputDto } from './dto/create-stock-output.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isNil } from 'lodash';
import { NotFoundError } from 'src/errors';

@Injectable()
export class StockOutputService {
  constructor(private readonly _prismaService: PrismaService) {}

  public async create({ productID, quantity, date }: CreateStockOutputDto) {
    const { stockOutput, product } = this._prismaService;

    const fetchedProduct = await product.findUnique({
      where: { id: productID },
    });

    if (isNil(fetchedProduct)) {
      throw new NotFoundError(`Cannot find product with ID: ${productID}`);
    }

    const createStockOutputOP = stockOutput.create({
      data: { productID, quantity, date },
    });

    const updateProductOP = product.update({
      where: { id: productID },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    const [createdStocked] = await this._prismaService.$transaction([
      createStockOutputOP,
      updateProductOP,
    ]);

    return createdStocked;
  }

  findAll() {
    return this._prismaService.stockOutput.findMany({});
  }

  async findOne(id: number) {
    try {
      return await this._prismaService.stockOutput.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError(`Cannot find stock output with ID: ${id}`);
      }
      throw error;
    }
  }
}
