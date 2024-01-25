import { ApiProperty } from '@nestjs/swagger';
import { AuthM } from 'src/domain/models/auth';
import { UserM } from 'src/domain/models/user';

export class AuthPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  user: UserM;
  @ApiProperty()
  codeExpiresAt: Date;
  @ApiProperty()
  createddate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(auth: AuthM) {
    const { id, email, code, codeExpiresAt, createddate, updateddate } = auth;
    this.id = id;
    this.email = email;
    this.code = code;
    this.codeExpiresAt = codeExpiresAt;
    this.createddate = createddate;
    this.updateddate = updateddate;
  }
}
