import { Controller, Inject, Post, Body } from '@nestjs/common';
import { UserPresenter } from './user_presenter';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { GetUserCases } from 'src/usecases/user/getUser_usecases';
import { AddUserCases } from 'src/usecases/user/addUser_usecases';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response_decorator';
import { AddUserDTO } from './user_dto';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetUserCases>,
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddUserCases>,
  ) {}

  @Post()
  @ApiResponseType(UserPresenter, false)
  async createUser(@Body() addUserDTO: AddUserDTO) {
    const userCreated = await this.addUserUsecaseProxy
      .getInstance()
      .execute(addUserDTO);
    return new UserPresenter(userCreated);
  }
}
