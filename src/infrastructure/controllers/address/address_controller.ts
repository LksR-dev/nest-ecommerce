import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddressPresenter } from './address_presenter';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { AddAddressUseCases } from 'src/usecases/address/updateAddress_usecases';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response_decorator';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { AddAddressDTO } from './address_dto';
import { GetAddressUseCases } from 'src/usecases/address/getAddress_usecases';

@Controller('address')
@ApiTags('address')
@ApiResponse({
  status: 201,
  description: 'The address has been successfully created.',
})
@ApiResponse({
  status: 200,
  description: 'The address has been successfully obtained.',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AddressPresenter)
export class AddressController {
  constructor(
    @Inject(UsecasesProxyModule.ADD_ADDRESS_USECASES_PROXY)
    private readonly addAddressUsecasesProxy: UseCaseProxy<AddAddressUseCases>,
    @Inject(UsecasesProxyModule.GET_ADDRESS_USECASES_PROXY)
    private readonly getAddressUsecasesProxy: UseCaseProxy<GetAddressUseCases>,
  ) {}

  @Post()
  @ApiCookieAuth()
  @ApiResponseType(AddressPresenter, false)
  @UseGuards(JwtAuthGuard)
  async add(@Body() body: AddAddressDTO, @Req() request: any) {
    const userId = request.user.id;
    const addressAdded = await this.addAddressUsecasesProxy
      .getInstance()
      .execute(body, userId);
    return new AddressPresenter(addressAdded);
  }

  @Get()
  @ApiCookieAuth()
  @ApiResponseType(AddressPresenter, false)
  @UseGuards(JwtAuthGuard)
  async get(@Req() request: any) {
    const userId = request.user.id;
    const addressWithUser = await this.getAddressUsecasesProxy
      .getInstance()
      .execute(userId);
    return new AddressPresenter(addressWithUser);
  }
}
