import { ProductM } from '../models/product';

export interface ProductRepository {
  insert(productData: ProductM): Promise<ProductM>;
  findById(productId: string): Promise<ProductM>;
  getAll(): Promise<[products: ProductM[], count: number]>;
  update(productId: string, productData: Partial<ProductM>): Promise<void>;
}
