import { AuthM } from '../models/auth';

export interface AuthRepository {
  upsert(auth: AuthM, searchBy: string): Promise<AuthM>;
  updateBy(updatedBy: string, updateData: Partial<AuthM>): Promise<AuthM>;
  findByEmail(userEmail: string): Promise<AuthM>;
  deleteById(authId: string): Promise<void>;
}
