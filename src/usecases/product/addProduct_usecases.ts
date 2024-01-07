import { ProductRepository } from 'src/domain/repositories/product_repository';
// import { ProductM } from 'src/domain/models/product';
import { ILogger } from 'src/domain/logger/logger_interface';
import { IAWSService } from 'src/domain/services/aws_service';

export class AddProductUsecases {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly logger: ILogger,
    private readonly awsService: IAWSService,
  ) {}

  async execute(productData: any) {
    const { images, ...restOfProductData } = productData;
    const imagesUrl = await this.awsService.uploadImages(images);
    restOfProductData.images = imagesUrl;
    const productAdded = await this.productRepository.insert(restOfProductData);
    this.logger.log(
      'ADD PRODUCT EXECUTE',
      'The product has been added succesfully',
    );
    return productAdded;
  }
}
