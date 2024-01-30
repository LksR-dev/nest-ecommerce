import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderPresenter } from './order_presenter';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { AddOrderDTO } from './order_dto';
import { AddOrderUsecases } from 'src/usecases/order/addOrder_usecases';

@ApiTags('orders')
@Controller('orders')
@ApiExtraModels(OrderPresenter)
@ApiResponse({
  status: 201,
  description: 'The order has been successfully created.',
})
@ApiResponse({
  status: 200,
  description: 'The order has been successfully obtained.',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class OrderController {
  constructor(
    @Inject(UsecasesProxyModule.ADD_ORDER_USECASES_PROXY)
    private readonly addOrderProxy: UseCaseProxy<AddOrderUsecases>,
  ) {}

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async addCartItems(@Body() body: AddOrderDTO, @Req() request: any) {
    const user = request.user;
    const { orderData, productsData } = body;
    const order = await this.addOrderProxy
      .getInstance()
      .execute(orderData, productsData, user);
    return order;
  }
}
