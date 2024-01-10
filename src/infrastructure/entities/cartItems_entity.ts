import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { ShoppingCart } from './shoppingCart_entity';
import { Product } from './product_entity';

@Entity()
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'shoppingCartId' })
  shoppingCart: ShoppingCart;

  @ManyToOne(() => Product, (product: Product) => product.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('int', { nullable: false })
  productQuantity: number;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
