import { AuthM } from '../models/auth';

export interface AuthRepository {
  upsert(auth: AuthM, searchBy: Partial<keyof AuthM>): Promise<AuthM>;
  updateBy(updatedBy: string, updateData: Partial<AuthM>): Promise<AuthM>;
  findByEmail(userEmail: string): Promise<AuthM>;
  deleteById(authId: string): Promise<void>;
}
