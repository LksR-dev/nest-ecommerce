import { OrderM } from '../models/order';

export interface OrderRepository {
  insert(orderData: OrderM): Promise<OrderM>;
  findById(orderId: string): Promise<OrderM>;
  findByUserId(userId: string): Promise<OrderM[]>;
  update(orderId: string, orderData: Partial<OrderM>): Promise<any>;
}
