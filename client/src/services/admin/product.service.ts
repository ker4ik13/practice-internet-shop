import $api from "@/http";
import type { Product, ProductWithoutId } from "@/shared/types/product";

export class ProductService {
  static async getAll() {
    return await $api.get<Product[]>("/products");
  }

  static async getBySlug(slug: string) {
    return await $api.get<Product>(`/products/${slug}`);
  }

  static async create(product: ProductWithoutId) {
    return await $api.post<Product>("/products", product);
  }

  static async deleteBySlug(slug: string) {
    return await $api.delete<Product>(`/products/${slug}`);
  }

  static async updateBySlug(slug: string, product: ProductWithoutId) {
    return await $api.patch<Product>(`/products/${slug}`, product);
  }
}
