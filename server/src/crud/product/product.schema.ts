import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductWithoutId } from 'src/types/product';

export type ProductDocument = HydratedDocument<ProductWithoutId>;

@Schema({
  collection: 'products',
})
export class Product implements ProductWithoutId {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  updatedAt?: string;

  @Prop({
    required: true,
  })
  createdAt: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  preview: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  stock: number;

  @Prop({
    required: true,
    default: 'published',
  })
  status: 'published' | 'draft';

  @Prop({
    required: true,
  })
  slug: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
