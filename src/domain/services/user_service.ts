import { UserM } from '../models/user';

export interface IUserService {
  createUser(userData: Partial<UserM>): UserM;
}
