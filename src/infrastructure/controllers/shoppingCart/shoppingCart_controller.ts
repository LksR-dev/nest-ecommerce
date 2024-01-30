import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ShoppingCartPresenter } from './shoppingCart_presenter';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { GetShoppingCart } from 'src/usecases/shoppingCart/getShoppingCart_usecases';
import { ClearShoppingCart } from './shoppingCart_dto';
import { DeleteProductInShoppingCart } from 'src/usecases/shoppingCart/deletProduct_usecases';

@ApiTags('shoppingCart')
@Controller('shoppingCart')
@ApiExtraModels(ShoppingCartPresenter)
@ApiResponse({
  status: 201,
  description: 'The shoppingCart has been successfully created.',
})
@ApiResponse({
  status: 200,
  description: 'The shoppingCart has been successfully obtained.',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class ShoppingCartController {
  constructor(
    @Inject(UsecasesProxyModule.GET_SHOPPINGCART_USECASES_PROXY)
    private readonly getShoppingCartUseCasesProxy: UseCaseProxy<GetShoppingCart>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_SHOPPINGCART_USECASES_PROXY)
    private readonly deleteProductOnShoppingCartUseCasesProxy: UseCaseProxy<DeleteProductInShoppingCart>,
  ) {}

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyShoppingCart(@Req() request: any) {
    const userId: string = request.user.id;
    return await this.getShoppingCartUseCasesProxy
      .getInstance()
      .execute(userId);
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProducts(@Body() body: ClearShoppingCart, @Req() request: any) {
    const userId = request.user.id;
    return await this.deleteProductOnShoppingCartUseCasesProxy
      .getInstance()
      .execute(userId, body.productId);
  }
}
