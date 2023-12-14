import { ILogger } from 'src/domain/logger/logger_interface';
import { JWTConfig } from 'src/domain/config/jwt_interface';
import {
  IJwtService,
  IJwtServicePayload,
} from 'src/domain/adapters/jwt.interface';
import { AuthRepository } from 'src/domain/repositories/auth_repository';
import { IAuthService } from 'src/domain/services/auth_service';
import { UserRepository } from 'src/domain/repositories/user_repository';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtConfig: JWTConfig,
    private readonly jwtTokenService: IJwtService,
    private readonly authRepository: AuthRepository,
    private readonly authService: IAuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async getCookieWithJwtToken(loginData: { email: string; code: string }) {
    const { email, code } = loginData;
    const authFounded = await this.authRepository.findByEmail(email);
    const authValidated = this.authService.verifyCode(authFounded, code);
    if (!authValidated) throw new Error('The code is invalid or expired.');
    const userId = authFounded.user.id;
    const payload: IJwtServicePayload = { userId };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    this.logger.log(
      'LoginUseCases getCookieWithJwtToken',
      `The user ${userId} have been logged`,
    );
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async validateUserForJWTStragtegy(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return null;
    }
    return user;
  }
}
