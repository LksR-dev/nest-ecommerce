import { UserM } from './user';

export class AddressM {
  id: string;
  user: UserM;
  street_name: string;
  street_number: number;
  city: {
    name: string;
  };
  zip_code: string;
  apartment?: {
    number?: number;
    letter?: string;
  };
  createddate: Date;
  updateddate: Date;
}
