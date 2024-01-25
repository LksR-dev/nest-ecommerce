import { AddressM } from '../models/address';

export interface AddressRepository {
  upsert(addressData: Partial<AddressM>, userId: string): Promise<AddressM>;
  get(userId: string): Promise<AddressM>;
}
