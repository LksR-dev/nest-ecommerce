import { OrderM } from './order';
import { ProductM } from './product';

export class OrderItemsM {
  id: string;
  order: OrderM;
  product: ProductM;
  quantity: number;
  price_at_purchase: number;
  createddate: Date;
  updateddate: Date;
}

export class ProductOrderItemData {
  product: {
    id: string;
    price: number;
  };
  productQuantity: number;
}
