import {
  Controller,
  Inject,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response_decorator';
import { LoginDTO } from './auth_dto';
import { AuthPresenter } from './auth_presenter';
import { LoginUseCases } from 'src/usecases/auth/login_usecase';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { LogoutUseCases } from 'src/usecases/auth/logout_usecase';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels()
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
  ) {}

  @Post('login')
  @ApiResponseType(AuthPresenter, false)
  async createAuth(@Body() addAuthDTO: LoginDTO, @Request() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(addAuthDTO);
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);
    console.log(accessTokenCookie);
    return 'Login successful';
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Request() request: any) {
    const cookie = await this.logoutUsecaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', [cookie]);
    return 'Logout successful';
  }
}
