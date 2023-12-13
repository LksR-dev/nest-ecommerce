import { Injectable } from '@nestjs/common';
import { UserM } from 'src/domain/models/user';
import { IUserService } from 'src/domain/services/user_service';

@Injectable()
export class UserService implements IUserService {
  createUser(userData: {
    email: string;
    name?: string;
    lastname?: string;
  }): UserM {
    const { email, name, lastname } = userData;
    const user = new UserM();
    user.email = email;
    user.name = name;
    user.lastname = lastname;
    return user;
  }
}
