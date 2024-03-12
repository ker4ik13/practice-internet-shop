export interface Product {
  _id: string;
  name: string;
  description: string;
  preview: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt?: string;
  slug: string;
  status: "published" | "draft";
}

export interface ProductWithoutId extends Omit<Product, "_id"> {}
