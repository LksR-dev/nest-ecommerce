import { Module } from '@nestjs/common';
import { UserController } from './user/user_controller';
import { AuthController } from './auth/auth_controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases_module';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, AuthController],
  providers: [],
})
export class ControllersModule {}
