import { UserM } from '../models/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  update(id: string, user: UserM): Promise<number>;
  findById(id: string): Promise<UserM>;
  findOrCreate(
    searchBy: Partial<keyof UserM>,
    userData: Partial<UserM>,
  ): Promise<UserM>;
  deleteById(id: string): Promise<void>;
  getAll(): Promise<UserM[]>;
}
