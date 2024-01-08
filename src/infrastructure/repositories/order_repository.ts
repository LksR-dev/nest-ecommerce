import { Injectable } from '@nestjs/common';
import { OrderM } from 'src/domain/models/order';
import { Repository } from 'typeorm';
import { Order } from '../entities/order_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/domain/repositories/order_repository';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async insert(productData: OrderM): Promise<OrderM> {
    return await this.orderRepository.save(productData);
  }

  async findByUserId(userId: string): Promise<OrderM[]> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
  async findById(id: string): Promise<OrderM> {
    return await this.orderRepository.findOneByOrFail({ id });
  }
  async update(id: string, productData: Partial<OrderM>): Promise<void> {
    await this.orderRepository.update({ id }, productData);
  }
}
