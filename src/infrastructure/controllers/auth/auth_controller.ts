import { Controller, Inject, Post, Body, UseGuards, Res } from '@nestjs/common';
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
import { LoginUseCases } from 'src/usecases/auth/login_usecases';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { LogoutUseCases } from 'src/usecases/auth/logout_usecases';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
  ) {}

  @Post('login')
  @ApiResponseType(AuthPresenter, false)
  @ApiOperation({ description: 'login' })
  async createAuth(
    @Body() addAuthDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, expirationTime } = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(addAuthDTO);

    response.cookie('Authorization', token, {
      maxAge: expirationTime,
      httpOnly: true,
      path: '/',
    });
    console.log(token);
    return 'Login successful';
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Res() response: Response) {
    response.cookie('Authorization', '', { maxAge: 0 });
    return 'Logout successful';
  }
}
