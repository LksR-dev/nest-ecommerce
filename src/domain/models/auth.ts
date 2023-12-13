import { UserM } from './user';

export class AuthM {
  id: string;
  email: string;
  code: string;
  user: UserM;
  codeExpiresAt: Date;
  createddate: Date;
  updateddate: Date;
}

export interface TokenPayload {
  email: string;
  userId: string;
}
