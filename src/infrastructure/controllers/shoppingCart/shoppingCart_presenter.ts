import { ApiProperty } from '@nestjs/swagger';
import { ShoppingCartM } from 'src/domain/models/shoppingCart';
import { UserM } from 'src/domain/models/user';

export class ShoppingCartPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  user: UserM;
  @ApiProperty()
  createddate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(shoppingCart: ShoppingCartM) {
    const { id, user } = shoppingCart;
    const userId = { id: user.id } as UserM;
    this.id = id;
    this.user = userId;
  }
}
