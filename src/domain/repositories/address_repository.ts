import { AddressM } from '../models/address';

export interface AddressRepository {
  upsert(addressData: Partial<AddressM>): Promise<AddressM>;
  get(): Promise<AddressM>;
}
