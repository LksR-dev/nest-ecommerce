import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  first_name: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { nullable: true })
  last_name: string;

  @Column('jsonb', { nullable: true })
  phone: {
    area_code: string;
    number: number;
  };

  @Column('jsonb', { nullable: true })
  identification: {
    type: string;
    number: string;
  };

  @Column('boolean', { default: false, nullable: false })
  unable: boolean;

  @Column('varchar', { nullable: false })
  role: 'admin' | 'user';

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
