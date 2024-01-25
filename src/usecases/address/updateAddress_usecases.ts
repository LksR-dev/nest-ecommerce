import { AddressM } from 'src/domain/models/address';
import { AddressRepository } from 'src/domain/repositories/address_repository';
import { ILogger } from 'src/domain/logger/logger_interface';

export class AddAddressUseCases {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(addressData: Partial<AddressM>, userId: string) {
    const addressAdded = await this.addressRepository.upsert(
      addressData,
      userId,
    );
    this.logger.log(
      'Add Address execute',
      `It has been upser succesfully: ${addressAdded}`,
    );
    return addressAdded;
  }
}
