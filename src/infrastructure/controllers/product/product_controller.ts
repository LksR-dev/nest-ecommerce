import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductPresenter } from './product_presenter';
import { GetProductDTO } from './product_dto';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response_decorator';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { GetProductUsecases } from 'src/usecases/product/getProduct_usecases';
import { ProductM } from 'src/domain/models/product';
import { GetProductsUsecases } from 'src/usecases/product/getProducts_usecases';

@Controller()
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY)
    private readonly getProductUsecaseProxy: UseCaseProxy<GetProductUsecases>,
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getProductsUsecaseProxy: UseCaseProxy<GetProductsUsecases>,
  ) {}

  @Get()
  @ApiResponseType(ProductPresenter, false)
  async getProduct(@Param() getProduct: GetProductDTO): Promise<ProductM> {
    const product = await this.getProductUsecaseProxy
      .getInstance()
      .execute(getProduct.id);
    return new ProductPresenter(product);
  }

  @Get()
  @ApiResponseType(ProductPresenter, true)
  async getAll(): Promise<[products: ProductM[], count: number]> {
    return await this.getProductsUsecaseProxy.getInstance().execute();
  }
}
