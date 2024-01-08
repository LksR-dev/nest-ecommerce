export class UserM {
  id: string;
  name: string;
  lastname: string;
  email: string;
  unable: boolean;
  role: 'admin' | 'user';
  createddate: Date;
  updateddate: Date;
}
