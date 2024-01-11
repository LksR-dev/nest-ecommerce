import { ShoppingCartRepository } from 'src/domain/repositories/shoppingCart_repository';
import { CartItemsRepository } from 'src/domain/repositories/cartItems_repository';
import { ILogger } from 'src/domain/logger/logger_interface';

export class DeleteProductInShoppingCart {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
    private readonly cartItemsRepository: CartItemsRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(userId: string, productsId: string[]) {
    const shoppingCart = await this.shoppingCartRepository.findByUserId(userId);
    const shoppingCartId = shoppingCart.id;
    const productsDeletedToShoppingCart =
      await this.cartItemsRepository.deleteItem(shoppingCartId, productsId);
    this.logger.log(
      'DeleteProductInShoppingCart Execute',
      'Deleted Successfully',
    );
    return `${productsDeletedToShoppingCart} has been deleted succesfully`;
  }
}
