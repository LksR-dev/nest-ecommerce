import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly id: number;
}

export class AddUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}
