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

    const calculateTotalPrice = () => {
      let totalPrice: number = 0;
      cartItemsWithProducts.forEach((cart) => {
        const { productQuantity, product } = cart;
        const { price } = product;
        totalPrice += productQuantity * price;
      });
      const formattedTotalPrice = totalPrice.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'ARS',
      });
      return formattedTotalPrice;
    };
    this.logger.log(
      'GetShoppingCart Execute',
      'The shoppingcart getting succesfully',
    );

    return { cartItemsWithProducts, totalPrice: calculateTotalPrice() };
  }
}
