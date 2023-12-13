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
  code: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  codeExpires: Date;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(user: UserM) {
    this.id = user.id;
    this.name = user.name;
    this.lastname = user.lastname;
    this.email = user.email;
    this.createdate = user.createddate;
    this.updateddate = user.updateddate;
  }
}
