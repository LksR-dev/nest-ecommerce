import { ApiProperty } from '@nestjs/swagger';
import { UserM } from 'src/domain/models/user';

export class UserPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  phone: {
    area_code: string;
    number: number;
  };
  @ApiProperty()
  identification: {
    type: string;
    number: string;
  };
  @ApiProperty()
  code: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  codeExpires: Date;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(user: UserM) {
    this.id = user.id;
    this.name = user.first_name;
    this.lastname = user.last_name;
    this.email = user.email;
    this.role = user.role;
    this.phone = user.phone;
    this.identification = user.identification;
    this.createdate = user.createddate;
    this.updateddate = user.updateddate;
  }
}
