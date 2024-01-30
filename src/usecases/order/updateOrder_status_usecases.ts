import { ILogger } from 'src/domain/logger/logger_interface';
import { OrderItemsRepository } from 'src/domain/repositories/orderItems_repository';
import { OrderRepository } from 'src/domain/repositories/order_repository';
import { IMercadoPagoService } from 'src/domain/services/mercado_pago_service';
import { IEmailService } from 'src/domain/services/email_service';
import { UserM } from 'src/domain/models/user';

export class UpdateOrderStatus {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly mercadoPago: IMercadoPagoService,
    private readonly sengridService: IEmailService,
    private readonly logger: ILogger,
  ) {}

  async execute(id: string, topic: string, user: UserM) {
    if (topic === 'payment') {
      const { status, external_reference } =
        await this.mercadoPago.getMerchantOrder(id);
      if (status === 'approved') {
        const orderID = external_reference;
        const orderFounded = await this.orderRepository.update(orderID, {
          status: status,
        });
        const userEmail = user.email;
        const orderItems =
          await this.orderItemsRepository.findByOrderIdWithProducts(
            orderFounded.id,
          );
        const products = orderItems.map((item) => item.product);
        await this.sengridService.sendOrder(userEmail, products);
      }
    }
  }
}
