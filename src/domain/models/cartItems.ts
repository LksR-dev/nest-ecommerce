import { ProductM } from './product';
import { ShoppingCartM } from './shoppingCart';

export class CartItemsM {
  id: string;
  product: ProductM;
  shoppingCart: ShoppingCartM;
  productQuantity: number;
  createddate: Date;
  updateddate: Date;
}
