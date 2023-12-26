import { ProductM } from './product';
import { UserM } from './user';

export class OrderM {
  id: string;
  product: ProductM[];
  user: UserM;
  status: string;
  createddate: Date;
  updateddate: Date;
}
