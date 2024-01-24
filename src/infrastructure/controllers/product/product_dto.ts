import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class GetProductDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
}

export class AddProductDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString({ each: true })
  readonly images: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly unable: boolean;
}
