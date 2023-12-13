import { AuthM } from '../models/auth';

export interface IAuthService {
  createAuth(authData: Partial<AuthM>): AuthM;
  verifyCode(auth: AuthM, code: string): boolean;
  generateCode(): { code: string; codeExpiresAt: Date };
}
