import {
  Controller,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { PostMerchantOrder } from './mercado_pago_dto';
import { UpdateOrderStatus } from 'src/usecases/order/updateOrder_status_usecases';

@ApiTags('ipn')
@Controller('ipn')
@ApiResponse({ status: 500, description: 'Internal error' })
export class IPNController {
  constructor(
    @Inject(UsecasesProxyModule.PATCH_ORDER_USECASES_PROXY)
    private readonly addOrderProxy: UseCaseProxy<UpdateOrderStatus>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addCartItems(@Query() params: PostMerchantOrder, @Req() req: any) {
    const id = params.id;
    const topic = params.topic;
    const user = req.user;
    const order = await this.addOrderProxy
      .getInstance()
      .execute(id, topic, user);
    return order;
  }
}
