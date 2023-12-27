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
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user: User) => user.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { length: 6 })
  code: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  codeExpiresAt: Date;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
