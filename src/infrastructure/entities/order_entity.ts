import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user_entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user: User) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('float')
  total_cost: number;

  @Column('varchar')
  payment_method: string;

  @Column('varchar')
  status: string;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
