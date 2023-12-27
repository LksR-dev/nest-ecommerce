import { ProductM } from 'src/domain/models/product';
import { ProductRepository } from 'src/domain/repositories/product_repository';
import { ILogger } from 'src/domain/logger/logger_interface';

export class GetProductsUsecases {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(): Promise<[products: ProductM[], count: number]> {
    return await this.productRepository.getAll();
  }
}
