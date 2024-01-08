import { OrderItemsM } from '../models/orderItems';

export interface OrderItemsRepository {
  insert(orderItemsData: OrderItemsM): Promise<OrderItemsM>;
  findById(orderItemsId: string): Promise<OrderItemsM>;
  findByOrderId(orderId: string): Promise<OrderItemsM[]>;
}
