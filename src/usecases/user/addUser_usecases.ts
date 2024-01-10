import { ILogger } from 'src/domain/logger/logger_interface';
import { UserM } from 'src/domain/models/user';
import { AuthRepository } from 'src/domain/repositories/auth_repository';
import { UserRepository } from 'src/domain/repositories/user_repository';
import { IAuthService } from 'src/domain/services/auth_service';
import { IUserService } from 'src/domain/services/user_service';
import { IEmailService } from 'src/domain/services/email_service';
import { IAWSService } from 'src/domain/services/aws_service';
import { ShoppingCartRepository } from 'src/domain/repositories/shoppingCart_repository';

export class AddUserCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly userService: IUserService,
    private readonly authRepository: AuthRepository,
    private readonly authService: IAuthService,
    private readonly emailService: IEmailService,
    private readonly awsService: IAWSService,
    private readonly shoppingCartRepository: ShoppingCartRepository,
  ) {}

  async execute(userData: { email: string }): Promise<UserM> {
    const { email } = userData;
    const userCreated = this.userService.createUser(userData);
    const user = await this.userRepository.findOrCreate('email', userCreated);
    const { code, codeExpiresAt } = this.authService.generateCode();
    const auth = this.authService.createAuth({
      code,
      codeExpiresAt,
      email,
      user,
    });
    await this.authRepository.upsert(auth, 'email');
    const shoppingCart = this.shoppingCartRepository.createEntity({
      user,
    });
    await this.shoppingCartRepository.upsertByUserId(shoppingCart);
    // await this.awsService.sendEmail([email], code, 'login');
    await this.emailService.sendCodeEmail(email, code);
    this.logger.log(
      'UserService.createUser executed',
      'New user have been inserted',
    );
    return user;
  }
}
