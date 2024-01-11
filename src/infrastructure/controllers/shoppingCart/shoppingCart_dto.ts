import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';

export class ClearShoppingCart {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  productId: string[];
}
