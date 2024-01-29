import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ProductOrderItemData } from 'src/domain/models/orderItems';

class OrderData {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  total_cost: number;
}

export class AddOrderDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OrderData)
  orderData: OrderData;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProductOrderItemData)
  productsData: ProductOrderItemData[];
}
