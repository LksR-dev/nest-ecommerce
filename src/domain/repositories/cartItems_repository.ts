import { CartItemsM } from '../models/cartItems';

export interface CartItemsRepository {
  insert(data: CartItemsM): Promise<CartItemsM>;
  findById(id: string): Promise<CartItemsM>;
  findByShoppingCartId(shoppingCartId: string): Promise<CartItemsM[]>;
  updateItem(
    shoppingCartId: string,
    productId: string,
    quantity: number,
  ): Promise<CartItemsM>;
  deleteItem(shoppingCartId: string, productId: string[]): Promise<number>;
  createEntity(data: Partial<CartItemsM>): CartItemsM;
}
