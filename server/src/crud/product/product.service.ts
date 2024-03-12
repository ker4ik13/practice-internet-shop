import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private model: Model<Product>) {}

  async create(createProductDto: CreateProductDto) {
    return await this.model.create(createProductDto);
  }

  async findAll() {
    return await this.model.find();
  }

  async findBySlug(slug: string) {
    return await this.model.findOne({ slug });
  }

  async updateBySlug(slug: string, updateProductDto: UpdateProductDto) {
    return await this.model.updateOne({ slug }, updateProductDto, {
      new: true,
    });
  }

  async removeBySlug(slug: string) {
    return await this.model.deleteOne({ slug }, { new: true });
  }
}
