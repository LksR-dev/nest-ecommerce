import { Injectable } from '@nestjs/common';
import { ProductM } from 'src/domain/models/product';
import { ProductRepository } from 'src/domain/repositories/product_repository';
import { Repository } from 'typeorm';
import { Product } from '../entities/product_entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async insert(productData: ProductM): Promise<ProductM> {
    return await this.productRepository.save(productData);
  }
  async findById(id: string): Promise<ProductM> {
    return await this.productRepository.findOneByOrFail({ id });
  }
  async update(id: string, productData: Partial<ProductM>): Promise<void> {
    await this.productRepository.update({ id }, productData);
  }
}
