import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsUppercase,
  Length,
  ValidateNested,
} from 'class-validator';

export class UserPhoneDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  area_code: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  number: string;
}
export class UserIdentificationDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  @IsUppercase()
  type: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  number: string;
}

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

export class UpdateUserDTO {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => UserPhoneDTO)
  readonly phone: UserPhoneDTO;

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => UserIdentificationDTO)
  readonly identification: UserIdentificationDTO;
}
