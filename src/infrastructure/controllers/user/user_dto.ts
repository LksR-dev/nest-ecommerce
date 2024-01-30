import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUppercase,
  Length,
  ValidateNested,
} from 'class-validator';

export class UserPhoneDTO {
  @ApiProperty({
    required: true,
    description: `Area code for the user's phone number, for example +11`,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  area_code: string;

  @ApiProperty({
    required: true,
    description: `User's phone number, for example 4912334950`,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Length(10, 10)
  number: number;
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
