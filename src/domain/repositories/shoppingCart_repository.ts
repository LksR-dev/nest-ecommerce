import { ShoppingCartM } from '../models/shoppingCart';

export interface ShoppingCartRepository {
  upsertByUserId(data: ShoppingCartM): Promise<ShoppingCartM>;
  findById(id: string): Promise<ShoppingCartM>;
  findByUserId(userId: string): Promise<ShoppingCartM>;
  createEntity(shoppingCartData: Partial<ShoppingCartM>): ShoppingCartM;
}
