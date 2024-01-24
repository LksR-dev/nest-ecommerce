import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user_entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user: User) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('varchar', { unique: true, nullable: false })
  street: string;

  @Column('varchar', { nullable: false })
  city: string;

  @Column('varchar', { nullable: false })
  state: string;

  @Column('varchar', { nullable: false })
  postal_code: string;

  @Column('jsonb', { nullable: false })
  apartment?: { number?: number; letter?: string };

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  codeExpiresAt: Date;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
