import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { LoginUseCases } from 'src/usecases/auth/login_usecase';
import { ExceptionsService } from '../../exceptions/exceptions_service';
import { LoggerService } from '../../logger/logger_service';
import { TokenPayload } from 'src/domain/models/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.loginUsecaseProxy
      .getInstance()
      .validateUserForJWTStragtegy(payload.userId);
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found`);
      this.exceptionService.UnauthorizedException({
        message: 'User not found',
      });
    }
    return user;
  }
}
