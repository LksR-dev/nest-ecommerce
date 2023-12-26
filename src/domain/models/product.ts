import { UserM } from './user';

export class ProductM {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string;
  user: UserM;
  createddate: Date;
  updateddate: Date;
}
