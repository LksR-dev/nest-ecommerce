import { ProductM } from './product';

export class UserM {
  id: string;
  name: string;
  lastname: string;
  email: string;
  product: ProductM[];
  unable: boolean;
  role: 'admin' | 'user';
  createddate: Date;
  updateddate: Date;
}
