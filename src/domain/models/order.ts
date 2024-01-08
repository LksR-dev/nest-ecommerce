import { UserM } from './user';

export class OrderM {
  id: string;
  payment_method: string;
  user: UserM;
  status: string;
  total_cost: number;
  createddate: Date;
  updateddate: Date;
}
