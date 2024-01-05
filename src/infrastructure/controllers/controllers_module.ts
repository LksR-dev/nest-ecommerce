import { Module } from '@nestjs/common';
import { UserController } from './user/user_controller';
import { AuthController } from './auth/auth_controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases_module';
import { ProductController } from './product/product_controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, AuthController, ProductController],
  providers: [],
})
export class ControllersModule {}
