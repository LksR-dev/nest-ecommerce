import { Injectable } from '@nestjs/common';
import {
  IMercadoPagoService,
  IPreference,
} from 'src/domain/services/mercado_pago_service';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment_config_service';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { UserM } from 'src/domain/models/user';
import { AddressM } from 'src/domain/models/address';
import { ProductOrderItemData } from 'src/domain/models/orderItems';

@Injectable()
export class MercadoPagoService implements IMercadoPagoService {
  constructor(
    private readonly environmentConfig: EnvironmentConfigService,
    private readonly preference: Preference,
    private readonly payment: Payment,
  ) {
    const client = new MercadoPagoConfig({
      accessToken: this.environmentConfig.getMercadoPagoAccessToken(),
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });
    this.preference = new Preference(client);
    this.payment = new Payment(client);
  }

  async getMerchantOrder(id: string) {
    const paymentFounded = await this.payment.get({ id });
    const { external_reference, status } = paymentFounded;
    return { external_reference, status };
  }

  async sendPreference(preference): Promise<string> {
    const newPreference = await this.preference.create({ body: preference });
    return newPreference.sandbox_init_point;
  }

  async createPreferenceStructure(preferenceData: {
    userData: UserM;
    userAddressData: AddressM;
    orderID: string;
    productData: ProductOrderItemData[];
  }): Promise<string> {
    const { orderID, productData, userAddressData, userData } = preferenceData;
    const { identification, email, first_name, last_name, phone } = userData;
    const { zip_code, street_name, street_number } = userAddressData;

    const items = productData.map((product: ProductOrderItemData) => {
      const { id, price, title } = product.product;
      const quantity = product.productQuantity;
      return {
        id,
        unit_price: price,
        title,
        quantity,
      };
    });
    const preference: IPreference = {
      items: items as IPreference['items'],
      payer: {
        phone,
        identification,
        address: {
          zip_code,
          street_name,
          street_number,
        },
        email,
        name: first_name,
        surname: last_name,
      },
      back_urls: {
        success: 'https://ecommerce-front-sage-three.vercel.app/pay/success',
        pending: 'https://ecommerce-front-sage-three.vercel.app/pay/pending',
        failure: 'https://ecommerce-front-sage-three.vercel.app/pay/failure',
      },
      external_reference: orderID,
      notification_url:
        'https://webhook.site/ba6559fc-c552-4638-9d7d-ff3f9782a0f7',
    };
    return await this.sendPreference(preference);
  }
}
