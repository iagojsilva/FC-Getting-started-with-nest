import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/errors';

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

  async findOne(id: number) {
    try {
      return await this._prismaService.product.findUniqueOrThrow({where: {id}});
    } catch (error) {
      if (error.code === "P2025"){
        throw new NotFoundError(`Cannot find product with ID: ${id}`)
      }
      throw error
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this._prismaService.product.update({data: {...updateProductDto}, where: {id}});
    } catch (error) {
      if (error.code === "P2025"){
        throw new NotFoundError(`Cannot find product with ID: ${id}`)
      }
      throw error

    }
  }

  async remove(id: number) {
    try {
      return await this._prismaService.product.delete({ where: {id}});
    } catch (error) {
      if (error.code === "P2025"){
        throw new NotFoundError(`Cannot find product with ID: ${id}`)
      }
      throw error

    }
  }
}
