import { UserM } from 'src/domain/models/user';
import { UserRepository } from 'src/domain/repositories/user_repository';
import { ILogger } from 'src/domain/logger/logger_interface';
import { IUserService } from 'src/domain/services/user_service';

export class UpdateUserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: ILogger,
    private readonly userService: IUserService,
  ) {}

  async execute(id: string, userData: Partial<UserM>): Promise<any> {
    const user = this.userService.createUser(userData);
    const userUpdated = await this.userRepository.update(id, user);
    if (userUpdated === 1) {
      this.logger.log(
        'GetUser execute',
        `The user has been got succesfully: ${userUpdated}`,
      );
      return 'The user has been updated.';
    } else {
      this.logger.error(
        'UpdateUser execute',
        `Error to update user, affected rows: ${userUpdated}`,
      );
      throw new Error('Error to update user.');
    }
  }
}
