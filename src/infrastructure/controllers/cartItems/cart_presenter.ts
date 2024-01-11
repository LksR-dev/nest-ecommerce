import { ApiProperty } from '@nestjs/swagger';
import { CartItemsM } from 'src/domain/models/cartItems';
import { ProductM } from 'src/domain/models/product';
import { ShoppingCartM } from 'src/domain/models/shoppingCart';

export class CartItemsPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  product: ProductM;
  @ApiProperty()
  price: number;
  @ApiProperty()
  shoppingCart: ShoppingCartM;
  @ApiProperty()
  productQuantity: number;
  @ApiProperty()
  createddate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(cartItem: CartItemsM) {
    const { id, product, productQuantity, shoppingCart } = cartItem;
    this.id = id;
    this.product = product;
    this.shoppingCart = shoppingCart;
    this.productQuantity = productQuantity;
  }
}
