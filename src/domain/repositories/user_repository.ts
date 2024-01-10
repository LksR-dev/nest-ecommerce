import { UserM } from '../models/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  update(id: string, user: UserM): Promise<void>;
  findById(id: string): Promise<UserM>;
  findOrCreate(searchBy: Partial<keyof UserM>, userData: UserM): Promise<UserM>;
  deleteById(id: string): Promise<void>;
  getAll(): Promise<UserM[]>;
}
