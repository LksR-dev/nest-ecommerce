import { CartItemsM } from 'src/domain/models/cartItems';
import { CartItemsRepository } from 'src/domain/repositories/cartItems_repository';
import { ShoppingCartRepository } from 'src/domain/repositories/shoppingCart_repository';
import { ILogger } from 'src/domain/logger/logger_interface';
import { ProductRepository } from 'src/domain/repositories/product_repository';

export class AddCartItemsUseCases {
  constructor(
    private readonly cartItemsRepository: CartItemsRepository,
    private readonly shoppingCartRepository: ShoppingCartRepository,
    private readonly productRepository: ProductRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(
    data: { productQuantity: number; productId: string },
    userId: string,
  ) {
    const { productQuantity, productId } = data;
    const product = await this.productRepository.findById(productId);
    const shoppingCart = await this.shoppingCartRepository.findByUserId(userId);
    const dataToCartItemsEntity: Partial<CartItemsM> = {
      shoppingCart,
      productQuantity,
      product,
    };
    const cartItems = this.cartItemsRepository.createEntity(
      dataToCartItemsEntity,
    );
    const cartItemsAdded = await this.cartItemsRepository.insert(cartItems);
    this.logger.log(
      'AddCartItems Execute',
      `New user have been inserted, id: ${cartItemsAdded.id}`,
    );
    return cartItemsAdded;
  }
}
