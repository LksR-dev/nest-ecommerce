import { ProductM } from './product';
import { UserM } from './user';

export class OrderM {
  id: string;
  products: ProductM[];
  user: UserM;
  status: string;
  createddate: Date;
  updateddate: Date;
}
