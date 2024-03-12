import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  constructor(data: Partial<UpdateProductDto>) {
    super(data);
  }
}
