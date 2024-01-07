import { ILogger } from 'src/domain/logger/logger_interface';
import { UserM } from 'src/domain/models/user';
import { AuthRepository } from 'src/domain/repositories/auth_repository';
import { UserRepository } from 'src/domain/repositories/user_repository';
import { IAuthService } from 'src/domain/services/auth_service';
import { IUserService } from 'src/domain/services/user_service';
import { IEmailService } from 'src/domain/services/email_service';
import { IAWSService } from 'src/domain/services/aws_service';

export class AddUserCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly userService: IUserService,
    private readonly authRepository: AuthRepository,
    private readonly authService: IAuthService,
    private readonly emailService: IEmailService,
    private readonly awsService: IAWSService,
  ) {}

  async execute(userData: { email: string }): Promise<UserM> {
    const { email } = userData;
    const userCreated = this.userService.createUser(userData);
    const { user, userFounded } = await this.userRepository.findOrCreate(
      'email',
      userCreated,
    );
    const { code, codeExpiresAt } = this.authService.generateCode();
    if (userFounded) {
      const auth = this.authService.createAuth({ code, codeExpiresAt });
      await this.authRepository.updateBy(email, auth);
    } else {
      const auth = this.authService.createAuth({
        email,
        code,
        codeExpiresAt,
        user,
      });
      await this.authRepository.upsert(auth, 'email');
    }
    // await this.awsService.sendEmail([email], code, 'login');
    await this.emailService.sendCodeEmail(email, code);
    this.logger.log(
      'UserService.createUser executed',
      'New user have been inserted',
    );
    return user;
  }
}
