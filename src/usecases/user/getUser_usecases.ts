import { UserM } from 'src/domain/models/user';
import { UserRepository } from 'src/domain/repositories/user_repository';

export class GetUserCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserM> {
    return await this.userRepository.findById(id);
  }
}
