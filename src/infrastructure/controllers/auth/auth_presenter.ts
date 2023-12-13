import { ApiProperty } from '@nestjs/swagger';
import { AuthM } from 'src/domain/models/auth';
import { User } from 'src/infrastructure/entities/user.entity';

export class AuthPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  user: User;
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
