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
    return await this.cartItemsRepository.save(cartItemsData);
  }

  async findByShoppingCartId(shoppingCartId: string): Promise<CartItemsM[]> {
    return await this.cartItemsRepository
      .createQueryBuilder('cartItems')
      .leftJoinAndSelect('cartItems.shoppingCart', 'shoppingCart')
      .where('shoppingCart.id = :shoppingCart', { shoppingCartId })
      .getMany();
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
    productId: string,
  ): Promise<CartItemsM> {
    const cartItemsDeleted = await this.cartItemsRepository.delete({
      shoppingCart: { id: shoppingCartId },
      product: { id: productId },
    });
    return cartItemsDeleted.raw;
  }
}
