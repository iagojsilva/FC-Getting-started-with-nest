import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly _prismaService: PrismaService){}
  create(createProductDto: CreateProductDto) {
    return this._prismaService.product.create({
      data: {
        ...createProductDto,
        quantity: 0
      }
    })
  }

  findAll() {
    return this._prismaService.product.findMany({});
  }

  findOne(id: number) {
    return this._prismaService.product.findFirst({where: {id}});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this._prismaService.product.update({data: {...updateProductDto}, where: {id}});
  }

  remove(id: number) {
    return this._prismaService.product.delete({ where: {id}});
  }
}
