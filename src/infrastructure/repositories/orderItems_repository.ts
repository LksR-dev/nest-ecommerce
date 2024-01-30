import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderItems } from '../entities/orderItems_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemsRepository } from 'src/domain/repositories/orderItems_repository';
import { OrderItemsM } from 'src/domain/models/orderItems';
import { OrderM } from 'src/domain/models/order';
import { ProductM } from 'src/domain/models/product';

@Injectable()
export class DatabaseOrderItemsRepository implements OrderItemsRepository {
  constructor(
    @InjectRepository(OrderItems)
    private readonly orderItemsRepository: Repository<OrderItems>,
  ) {}

  async insert(itemsData: OrderItemsM): Promise<OrderItemsM> {
    return await this.orderItemsRepository.save(itemsData);
  }

  async findById(id: string): Promise<OrderItemsM> {
    return await this.orderItemsRepository.findOneByOrFail({ id });
  }

  async findByOrderIdWithProducts(orderId: string): Promise<OrderItems[]> {
    const query = this.orderItemsRepository
      .createQueryBuilder('orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .where('orderItems.orderId = :orderId', { orderId })
      .getMany();

    return query;
  }

  createEntity(
    order: OrderM,
    productData: {
      product: { id: string };
      price_at_purchase: number;
      quantity: number;
    },
  ): OrderItems {
    const { product, price_at_purchase, quantity } = productData;
    const orderItems = new OrderItemsM();
    orderItems.order = order;
    orderItems.product = product as ProductM;
    orderItems.price_at_purchase = price_at_purchase;
    orderItems.quantity = quantity;
    return orderItems;
  }
}
