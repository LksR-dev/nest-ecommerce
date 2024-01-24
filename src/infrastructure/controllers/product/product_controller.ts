import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductPresenter } from './product_presenter';
import { AddProductDTO, GetProductDTO } from './product_dto';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response_decorator';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { GetProductUsecases } from 'src/usecases/product/getProduct_usecases';
import { ProductM } from 'src/domain/models/product';
import { GetProductsUsecases } from 'src/usecases/product/getProducts_usecases';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { RolesGuard } from 'src/infrastructure/common/guards/role_guards';
import { Roles } from 'src/infrastructure/common/decorators/role_decorator';
import { Role } from 'src/domain/adapters/role_enum';
import { AddProductUsecases } from 'src/usecases/product/addProduct_usecases';

@Controller('products')
@ApiTags('products')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY)
    private readonly getProductUsecaseProxy: UseCaseProxy<GetProductUsecases>,
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getProductsUsecaseProxy: UseCaseProxy<GetProductsUsecases>,
    @Inject(UsecasesProxyModule.ADD_PRODUCTS_USECASES_PROXY)
    private readonly addProductsUsecaseProxy: UseCaseProxy<AddProductUsecases>,
  ) {}

  @Get('/:id')
  @ApiResponseType(ProductPresenter, false)
  async getProduct(@Param() getProduct: GetProductDTO): Promise<ProductM> {
    console.log(getProduct);
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

  @Post()
  @ApiResponseType(ProductPresenter, false)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createProduct(@Body() productData: AddProductDTO) {
    const productAdded = await this.addProductsUsecaseProxy
      .getInstance()
      .execute(productData);
    return new ProductPresenter(productAdded);
  }
}
