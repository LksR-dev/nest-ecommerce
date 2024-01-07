import { UserRepository } from 'src/domain/repositories/user_repository';
import { ILogger } from 'src/domain/logger/logger_interface';

export class GetUsersCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute() {
    this.logger.log('EXECUTE GET ALL USERS', 'execute');
    return await this.userRepository.getAll();
  }
}
