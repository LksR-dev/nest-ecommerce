import { Injectable } from '@nestjs/common';
import { AuthM } from 'src/domain/models/auth';
import { IAuthService } from 'src/domain/services/auth_service';

@Injectable()
export class AuthService implements IAuthService {
  createAuth(authData: Partial<AuthM>): AuthM {
    const { code, codeExpiresAt, email, user } = authData;
    const auth = new AuthM();
    auth.email = email;
    auth.code = code;
    auth.codeExpiresAt = codeExpiresAt;
    auth.user = user;
    return auth;
  }

  verifyCode(auth: AuthM, code: string): boolean {
    const dateNow = new Date();
    if (code === auth.code && dateNow <= auth.codeExpiresAt) return true;
    return false;
  }

  generateCode(): { code: string; codeExpiresAt: Date } {
    const min = 100000; // Mínimo valor de 6 dígitos
    const max = 999999; // Máximo valor de 6 dígitos
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const codeExpiresAt = new Date(new Date().getTime() + 30 * 60000);
    return { code: randomNumber.toString(), codeExpiresAt };
  }
}
