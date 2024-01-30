import { OrderM } from '../models/order';
import { OrderItemsM } from '../models/orderItems';

export interface OrderItemsRepository {
  insert(orderItemsData: OrderItemsM): Promise<OrderItemsM>;
  findById(orderItemsId: string): Promise<OrderItemsM>;
  findByOrderIdWithProducts(orderId: string): Promise<OrderItemsM[]>;
  createEntity(
    orderData: OrderM,
    productData: {
      product: { id: string };
      price_at_purchase: number;
      quantity: number;
    },
  ): OrderItemsM;
}
