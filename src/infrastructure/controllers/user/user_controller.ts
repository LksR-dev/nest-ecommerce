import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserPresenter } from './user_presenter';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { GetUserCases } from 'src/usecases/user/getUser_usecases';
import { AddUserCases } from 'src/usecases/user/addUser_usecases';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response_decorator';
import { AddUserDTO } from './user_dto';
import { GetAllUsersCases } from 'src/usecases/user/getAllUsers_usecases';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetUserCases>,
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getAllUserUsecaseProxy: UseCaseProxy<GetAllUsersCases>,
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(UserPresenter, false)
  async getUser(@Req() request: any) {
    const userId = request.user.id;
    return await this.getUserUsecaseProxy.getInstance().execute(userId);
  }
}
