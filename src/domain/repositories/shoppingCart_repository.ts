import { ShoppingCartM } from '../models/shoppingCart';

export interface ShoppingCartRepository {
  insert(data: ShoppingCartM): Promise<ShoppingCartM>;
  findById(id: string): Promise<ShoppingCartM>;
  findByUserId(userId: string): Promise<ShoppingCartM>;
}
