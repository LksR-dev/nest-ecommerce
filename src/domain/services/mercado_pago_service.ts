import { AddressM } from '../models/address';
import { ProductOrderItemData } from '../models/orderItems';
import { UserM } from '../models/user';

export interface IPreference {
  items: [
    {
      title: string;
      id: string;
      unit_price: number;
      quantity: number;
    },
  ];
  payer: {
    phone: { area_code: string; number: number };
    identification: { type: string; number: string };
    address: Partial<AddressM>;
    email: string;
    name: string;
    surname: string;
  };
  back_urls: {
    success: string;
    pending: string;
    failure: string;
  };
  external_reference: string;
  notification_url: string;
}

export interface IMercadoPagoService {
  getMerchantOrder(id: string);
  sendPreference(preference: IPreference): Promise<string>;
  createPreferenceStructure(preferenceData: {
    userData: UserM;
    userAddressData: AddressM;
    orderID: string;
    productData: ProductOrderItemData[];
  }): Promise<string>;
}
