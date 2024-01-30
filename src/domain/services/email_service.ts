import { ProductM } from '../models/product';

export interface IEmailService {
  sendCodeEmail(to: string, code: string): Promise<void>;
  sendOrder(to: string, products: ProductM[]): Promise<void>;
}
