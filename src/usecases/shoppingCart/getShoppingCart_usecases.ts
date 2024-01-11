import { ShoppingCartRepository } from 'src/domain/repositories/shoppingCart_repository';
import { ILogger } from 'src/domain/logger/logger_interface';
import { CartItemsRepository } from 'src/domain/repositories/cartItems_repository';

export class GetShoppingCart {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
    private readonly cartItemsRepository: CartItemsRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(userId: string) {
    const shoppingCart = await this.shoppingCartRepository.findByUserId(userId);
    const shoppingCartId = shoppingCart.id;
    const cartItemsWithProducts =
      await this.cartItemsRepository.findByShoppingCartId(shoppingCartId);

    this.logger.log(
      'GetShoppingCart Execute',
      'The shoppingcart getting succesfully',
    );

    return cartItemsWithProducts;
  }
}
