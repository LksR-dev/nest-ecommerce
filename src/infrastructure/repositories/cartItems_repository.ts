import { Injectable } from '@nestjs/common';
import { CartItemsM } from 'src/domain/models/cartItems';
import { Repository } from 'typeorm';
import { CartItems } from '../entities/cartItems_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemsRepository } from 'src/domain/repositories/cartItems_repository';

@Injectable()
export class DatabaseCartItemsRepository implements CartItemsRepository {
  constructor(
    @InjectRepository(CartItems)
    private readonly cartItemsRepository: Repository<CartItems>,
  ) {}

  async insert(cartItemsData: CartItemsM): Promise<CartItemsM> {
    const { product, productQuantity, shoppingCart } = cartItemsData;
    const shoppingCartId = shoppingCart.id;
    const productId = product.id;
    const query = `
      INSERT INTO cart_items ("shoppingCartId", "productId", "productQuantity")
      VALUES ('${shoppingCartId}', '${productId}', ${productQuantity})
      ON CONFLICT ("shoppingCartId", "productId")
      DO UPDATE SET "productQuantity" = cart_items."productQuantity" + ${productQuantity}
      RETURNING *;
    `;
    const result = await this.cartItemsRepository.query(query);
    return result[0];
  }

  async findByShoppingCartId(shoppingCartId: string): Promise<CartItemsM[]> {
    return await this.cartItemsRepository.find({
      where: { shoppingCart: { id: shoppingCartId } },
      relations: ['product'],
      cache: 7900,
      select: ['product', 'productQuantity'],
    });
  }

  async findById(id: string): Promise<CartItemsM> {
    return await this.cartItemsRepository.findOneByOrFail({ id });
  }

  async updateItem(
    shoppingCartId: string,
    productId: string,
    quantity: number,
  ): Promise<CartItemsM> {
    const cartItemsUpdated = await this.cartItemsRepository.update(
      {
        product: { id: productId },
        shoppingCart: { id: shoppingCartId },
      },
      { productQuantity: quantity },
    );
    return cartItemsUpdated.raw;
  }

  async deleteItem(
    shoppingCartId: string,
    productsId: string[],
  ): Promise<number> {
    const cartItemsDeleted = await this.cartItemsRepository
      .createQueryBuilder()
      .delete()
      .from(CartItems)
      .where('product.id IN (:...ids)', { ids: productsId })
      .andWhere('shoppingCart.id = :id', { id: shoppingCartId })
      .execute();
    return cartItemsDeleted.affected;
  }

  createEntity(data: Partial<CartItemsM>): CartItemsM {
    const { shoppingCart, product, productQuantity } = data;
    const cartItems = new CartItemsM();
    cartItems.product = product;
    cartItems.productQuantity = productQuantity;
    cartItems.shoppingCart = shoppingCart;
    return cartItems;
  }
}
