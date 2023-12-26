import { ProductM } from './product';

export class UserM {
  id: string;
  name: string;
  lastname: string;
  email: string;
  product: ProductM[];
  createddate: Date;
  updateddate: Date;
}
