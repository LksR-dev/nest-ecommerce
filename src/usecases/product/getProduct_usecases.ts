import { ILogger } from 'src/domain/logger/logger_interface';
import { ProductM } from 'src/domain/models/product';
import { ProductRepository } from 'src/domain/repositories/product_repository';

export class GetProductUsecases {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(id: string): Promise<ProductM> {
    return await this.productRepository.findById(id);
  }
}
