import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from './user_entity';
import { Product } from './product_entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user: User) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(
    () => Product,
    (product: Product) => {
      product.id, product.price;
    },
    {
      cascade: true,
    },
  )
  products: Product[];

  @Column()
  status: string;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
