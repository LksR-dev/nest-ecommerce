import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from './order_entity';
import { Product } from './product_entity';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order: Order) => order.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, (product: Product) => product.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('float', { nullable: false })
  price_at_purchase: number;

  @Column('int', { nullable: false })
  quantity: number;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
