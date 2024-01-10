import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderItems } from '../entities/orderItems_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemsRepository } from 'src/domain/repositories/orderItems_repository';
import { OrderItemsM } from 'src/domain/models/orderItems';

@Injectable()
export class DatabaseOrderItemsRepository implements OrderItemsRepository {
  constructor(
    @InjectRepository(OrderItems)
    private readonly orderItemsRepository: Repository<OrderItems>,
  ) {}

  async insert(shoppingCartData: OrderItemsM): Promise<OrderItemsM> {
    return await this.orderItemsRepository.save(shoppingCartData);
  }

  async findById(id: string): Promise<OrderItemsM> {
    return await this.orderItemsRepository.findOneByOrFail({ id });
  }

  async findByOrderId(orderId: string): Promise<OrderItemsM[]> {
    return await this.orderItemsRepository.findBy({ order: { id: orderId } });
  }
}
