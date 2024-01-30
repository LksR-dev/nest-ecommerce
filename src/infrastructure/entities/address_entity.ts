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
  street_name: string;

  @Column('int', { unique: true, nullable: false })
  street_number: number;

  @Column('jsonb', { nullable: false })
  city: { name: string };

  @Column('varchar', { nullable: false })
  zip_code: string;

  @Column('jsonb', { nullable: false })
  apartment?: { number?: number; letter?: string };

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  codeExpiresAt: Date;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
