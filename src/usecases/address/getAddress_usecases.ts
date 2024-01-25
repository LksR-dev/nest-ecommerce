import { AddressRepository } from 'src/domain/repositories/address_repository';
import { ILogger } from 'src/domain/logger/logger_interface';

export class GetAddressUseCases {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(userId: string) {
    const getAddress = await this.addressRepository.get(userId);
    this.logger.log(
      'Add Address execute',
      `It has been got succesfully: ${getAddress}`,
    );
    return getAddress;
  }
}
