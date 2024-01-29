import { ILogger } from 'src/domain/logger/logger_interface';
import { OrderM } from 'src/domain/models/order';
import { ProductOrderItemData } from 'src/domain/models/orderItems';
import { UserM } from 'src/domain/models/user';
import { OrderItemsRepository } from 'src/domain/repositories/orderItems_repository';
import { OrderRepository } from 'src/domain/repositories/order_repository';

export class AddOrderUsecases {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(
    orderData: Partial<OrderM>,
    productsData: ProductOrderItemData[],
    user: UserM,
  ) {
    orderData.user = user;
    const order = await this.orderRepository.insert(orderData as OrderM);
    productsData.forEach(
      async (product: {
        product: { id: string; price: number };
        productQuantity: number;
      }) => {
        const { id, price } = product.product;
        const productData = {
          product: { id },
          price_at_purchase: price,
          quantity: product.productQuantity,
        };
        const orderItems = this.orderItemsRepository.createEntity(
          order,
          productData,
        );
        const orderItemInserted = await this.orderItemsRepository.insert(
          orderItems,
        );
        this.logger.log(
          'AddOrder execute',
          `Order items has been inserted successfully, orderItemsID: ${orderItemInserted.id}`,
        );
      },
    );
    this.logger.log(
      'AddLogger execute',
      `Order has been inserted succesfully, orderId: ${order.id}`,
    );
  }
}
