import { Injectable } from '@nestjs/common';
import { UserM } from 'src/domain/models/user';
import { IUserService } from 'src/domain/services/user_service';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly environmentConfig: EnvironmentConfigService) {}

  createUser(userData: Partial<UserM>): UserM {
    const { email, first_name, last_name, phone, identification } = userData;
    const user = new UserM();
    user.email = email;
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone = phone;
    user.identification = identification;
    if (email === this.environmentConfig.getAdminEmail()) {
      user.role = 'admin';
    } else {
      user.role = 'user';
    }

    return user;
  }
}
