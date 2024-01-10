import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItemsPresenter } from './cart_presenter';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { AddCartItemsUseCases } from 'src/usecases/cartItems/addCartItems_usecases';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { AddItemToCartDTO } from './cart_dto';

@ApiTags('cartItems')
@Controller('cartItems')
@ApiExtraModels(CartItemsPresenter)
@ApiResponse({ status: 500, description: 'Internal error' })
export class CartItemsController {
  constructor(
    @Inject(UsecasesProxyModule.POST_CARTITEEMS_USECASES_PROXY)
    private readonly addCartItemsProxy: UseCaseProxy<AddCartItemsUseCases>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addCartItems(@Body() body: AddItemToCartDTO, @Req() request: any) {
    const userId = request.user.id;
    const cartItems = await this.addCartItemsProxy
      .getInstance()
      .execute(body, userId);
    return new CartItemsPresenter(cartItems);
  }
}
