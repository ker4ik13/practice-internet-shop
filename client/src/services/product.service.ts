import $api from "@/http";
import type { Product } from "@/shared/types/product";

export class UserProductService {
  static async getAll() {
    return await $api.get<Product[]>("/products");
  }

  static async getBySlug(slug: string) {
    return await $api.get<Product>(`/products/${slug}`);
  }
}
