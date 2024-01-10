import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('float', { nullable: false })
  price: number;

  @Column('text', { nullable: false })
  description: string;

  @Column('varchar', { array: true, nullable: false })
  images: string[];

  @Column('boolean', { default: false, nullable: false })
  unable: boolean;

  @CreateDateColumn({ name: 'createdate' })
  createddate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
