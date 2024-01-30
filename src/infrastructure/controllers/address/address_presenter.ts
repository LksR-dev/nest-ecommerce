import { ApiProperty } from '@nestjs/swagger';
import { AddressM } from 'src/domain/models/address';
import { UserM } from 'src/domain/models/user';

export class AddressPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  user: UserM;
  @ApiProperty()
  street: string;
  @ApiProperty()
  street_number: number;
  @ApiProperty()
  city: {
    name: string;
  };
  @ApiProperty()
  zip_code: string;
  @ApiProperty()
  apartment?: {
    number?: number;
    letter?: string;
  };
  @ApiProperty()
  createddate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(address: AddressM) {
    const {
      id,
      city,
      zip_code,
      street_name,
      street_number,
      apartment,
      createddate,
      updateddate,
      user,
    } = address;
    this.id = id;
    this.city = city;
    this.zip_code = zip_code;
    this.street = street_name;
    this.street_number = street_number;
    this.apartment = apartment;
    this.user = user;
    this.createddate = createddate;
    this.updateddate = updateddate;
  }
}
