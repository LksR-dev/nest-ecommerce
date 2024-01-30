import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CityDTO {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;
}

export class ApartmentDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ required: true })
  number: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  letter: string;
}

export class AddAddressDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly street_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly street_number: number;

  @ApiProperty({ required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => CityDTO)
  readonly city: CityDTO;

  @ApiProperty({ required: false })
  @IsObject()
  @ValidateNested()
  @Type(() => ApartmentDTO)
  readonly apartment: ApartmentDTO;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly zip_code: string;
}
