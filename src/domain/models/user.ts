export class UserM {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: {
    area_code: string;
    number: number;
  };
  identification: {
    type: string;
    number: string;
  };
  unable: boolean;
  role: 'admin' | 'user';
  createddate: Date;
  updateddate: Date;
}
