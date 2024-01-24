import { Injectable } from '@nestjs/common';
import { UserM } from 'src/domain/models/user';
import { IUserService } from 'src/domain/services/user_service';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly environmentConfig: EnvironmentConfigService) {}

  createUser(userData: {
    email: string;
    name?: string;
    lastname?: string;
  }): UserM {
    const { email, name, lastname } = userData;
    const user = new UserM();
    user.email = email;
    user.first_name = name;
    user.last_name = lastname;
    if (email === this.environmentConfig.getAdminEmail()) {
      user.role = 'admin';
    } else {
      user.role = 'user';
    }

    return user;
  }
}
