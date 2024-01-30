import { Module } from '@nestjs/common';
import { UserController } from './user/user_controller';
import { AuthController } from './auth/auth_controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases_module';
import { ProductController } from './product/product_controller';
import { CartItemsController } from './cartItems/cart_controller';
import { ShoppingCartController } from './shoppingCart/shoppingCart_controller';
import { AddressController } from './address/address_controller';
import { OrderController } from './order/order_controller';
import { IPNController } from './ipn/mercado_pago_controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [
    UserController,
    AuthController,
    ProductController,
    CartItemsController,
    ShoppingCartController,
    AddressController,
    OrderController,
    IPNController,
  ],
  providers: [],
})
export class ControllersModule {}
