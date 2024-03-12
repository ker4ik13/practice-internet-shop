import type { ProductWithoutId } from 'src/types/product';

export class CreateProductDto implements ProductWithoutId {
  count: number;
  createdAt: string;
  description: string;
  name: string;
  preview: string;
  price: number;
  slug: string;
  status: 'published' | 'draft';
  stock: number;
  updatedAt?: string;

  constructor(data: ProductWithoutId) {
    Object.assign(this, data);
  }
}
