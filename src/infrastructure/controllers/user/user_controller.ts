import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GetUserCases } from 'src/usecases/user/getUser_usecases';
import { AddUserCases } from 'src/usecases/user/addUser_usecases';
import { GetUsersCases } from 'src/usecases/user/getAllUsers_usecases';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPresenter } from './user_presenter';
import { AddUserDTO } from './user_dto';
import { Role } from 'src/domain/adapters/role_enum';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases_module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases_proxy';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response_decorator';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwt_guard';
import { Roles } from 'src/infrastructure/common/decorators/role_decorator';
import { RolesGuard } from 'src/infrastructure/common/guards/role_guards';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecasesProxy: UseCaseProxy<GetUserCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getUsersUsecasesProxy: UseCaseProxy<GetUsersCases>,
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecasesProxy: UseCaseProxy<AddUserCases>,
  ) {}

  @Post('/register')
  @ApiResponseType(UserPresenter, false)
  async createUser(@Body() addUserDTO: AddUserDTO) {
    const userCreated = await this.addUserUsecasesProxy
      .getInstance()
      .execute(addUserDTO);
    return new UserPresenter(userCreated);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(UserPresenter, false)
  async getUser(@Req() request: any) {
    const userId = request.user.id;
    const user = await this.getUserUsecasesProxy.getInstance().execute(userId);
    return new UserPresenter(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiResponseType(UserPresenter, true)
  async getUsers() {
    return await this.getUsersUsecasesProxy.getInstance().execute();
  }
}
