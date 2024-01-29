import { ApiProperty } from '@nestjs/swagger';
import { OrderM } from 'src/domain/models/order';
import { UserM } from 'src/domain/models/user';

export class OrderPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  payment_method: string;
  @ApiProperty()
  user: UserM;
  @ApiProperty()
  status: string;
  @ApiProperty()
  total_cost: number;
  @ApiProperty()
  createddate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(auth: OrderM) {
    const {
      id,
      payment_method,
      status,
      total_cost,
      user,
      createddate,
      updateddate,
    } = auth;
    this.id = id;
    this.payment_method = payment_method;
    this.status = status;
    this.total_cost = total_cost;
    this.user = user;
    this.createddate = createddate;
    this.updateddate = updateddate;
  }
}
