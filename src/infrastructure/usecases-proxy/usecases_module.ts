import { DynamicModule, Module } from '@nestjs/common';

// Repositories
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user_repository';
import { DatabaseAuthRepository } from 'src/infrastructure/repositories/auth_repository';

// Services
import { ServicesModule } from '../services/services_module';
import { UserService } from '../services/user/user_service';
import { AuthService } from '../services/auth/auth_service';
import { JwtTokenService } from '../services/jwt/jwt_service';

// Use cases
import { GetUserCases } from 'src/usecases/user/getUser_usecases';
import { GetUsersCases } from 'src/usecases/user/getAllUsers_usecases';
import { AddUserCases } from 'src/usecases/user/addUser_usecases';
import { LoginUseCases } from 'src/usecases/auth/login_usecase';
import { LogoutUseCases } from 'src/usecases/auth/logout_usecase';
import { UseCaseProxy } from './usecases_proxy';
import { GetProductUsecases } from 'src/usecases/product/getProduct_usecases';
import { GetProductsUsecases } from 'src/usecases/product/getProducts_usecases';
import { AddProductUsecases } from 'src/usecases/product/addProduct_usecases';

// Modules
import { ExceptionsModule } from '../exceptions/exceptions_module';
import { LoggerModule } from '../logger/logger_module';
import { EnvironmentConfigModule } from '../config/environment-config/environment_config_module';
import { RepositoriesModule } from '../repositories/repositories_module';
import { SengridModule } from '../common/sengrid/sengrid_module';
import { JwtModule } from '../services/jwt/jwt_module';

// Services
import { LoggerService } from '../logger/logger_service';
import { EmailService } from '../common/sengrid/sengrid_service';
import { EnvironmentConfigService } from '../config/environment-config/environment_config_service';
import { DatabaseProductRepository } from '../repositories/product_repository';
import { AWSService } from '../services/aws/aws_service';

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
    SengridModule,
    ServicesModule,
    JwtModule,
  ],
})
export class UsecasesProxyModule {
  // User
  static GET_USER_USECASES_PROXY = 'getUserUsecasesProxy';
  static GET_USERS_USECASES_PROXY = 'getUsersUsecasesProxy';
  static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';

  // Login
  static LOGIN_USECASES_PROXY = 'postLoginUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'postLogoutUseCasesProxy';

  // Product
  static GET_PRODUCT_USECASES_PROXY = 'getProductUseCasesProxy';
  static GET_PRODUCTS_USECASES_PROXY = 'getProductsUseCasesProxy';
  static ADD_PRODUCTS_USECASES_PROXY = 'addProductUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new GetUserCases(userRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new GetUsersCases(logger, userRepository)),
        },
        // ADD USER AND AUTH
        {
          inject: [
            LoggerService,
            DatabaseUserRepository,
            UserService,
            DatabaseAuthRepository,
            AuthService,
            EmailService,
            AWSService,
          ],
          provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
            userService: UserService,
            authRepository: DatabaseAuthRepository,
            authService: AuthService,
            emailService: EmailService,
            awsService: AWSService,
          ) =>
            new UseCaseProxy(
              new AddUserCases(
                logger,
                userRepository,
                userService,
                authRepository,
                authService,
                emailService,
                awsService,
              ),
            ),
        },
        // LOGIN
        {
          inject: [
            LoggerService,
            EnvironmentConfigService,
            JwtTokenService,
            DatabaseAuthRepository,
            AuthService,
            DatabaseUserRepository,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            config: EnvironmentConfigService,
            jwtService: JwtTokenService,
            authRepo: DatabaseAuthRepository,
            authService: AuthService,
            userRepo: DatabaseUserRepository,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                config,
                jwtService,
                authRepo,
                authService,
                userRepo,
              ),
            ),
        },
        // LOGOUT
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        // PRODUCT
        {
          inject: [DatabaseProductRepository, LoggerService],
          provide: UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
          useFactory: (
            productRepo: DatabaseProductRepository,
            logger: LoggerService,
          ) => new UseCaseProxy(new GetProductUsecases(productRepo, logger)),
        },
        {
          inject: [DatabaseProductRepository, LoggerService],
          provide: UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
          useFactory: (
            productRepo: DatabaseProductRepository,
            logger: LoggerService,
          ) => new UseCaseProxy(new GetProductsUsecases(productRepo, logger)),
        },
        {
          inject: [DatabaseProductRepository, LoggerService, AWSService],
          provide: UsecasesProxyModule.ADD_PRODUCTS_USECASES_PROXY,
          useFactory: (
            productRepo: DatabaseProductRepository,
            logger: LoggerService,
            awsService: AWSService,
          ) =>
            new UseCaseProxy(
              new AddProductUsecases(productRepo, logger, awsService),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.POST_USER_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        UsecasesProxyModule.ADD_PRODUCTS_USECASES_PROXY,
      ],
    };
  }
}
