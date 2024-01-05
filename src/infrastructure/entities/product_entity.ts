import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user_entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('float')
  price: number;

  @Column('text')
  description: string;

  @Column('varchar', { array: true })
  images: string[];

  @ManyToOne(() => User, (user) => user.product)
  user: User;

  @Column('boolean', { default: false })
  unable: boolean;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
