import { ProductM } from '../models/product';

export interface ProductRepository {
  insert(productData: ProductM): Promise<ProductM>;
  findById(productId: string): Promise<ProductM>;
  update(productId: string, productData: Partial<ProductM>): Promise<void>;
}
