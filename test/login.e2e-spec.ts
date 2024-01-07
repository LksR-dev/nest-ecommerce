import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app_module';
import { AuthService } from 'src/infrastructure/services/auth/auth_service';
import { AuthM } from 'src/domain/models/auth';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  // Código generado para el flujo de login.
  const mockCode = '123456';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Aquí obtenemos una referencia al AuthService para poder hacerle mock al metodo que valida el código.
    authService = moduleFixture.get<AuthService>(AuthService);
    jest
      .spyOn(authService, 'verifyCode')
      .mockImplementation((auth: AuthM, code: string) => code === mockCode);
  });

  it('/user/register (POST) - should register a user and send a code via email', async () => {
    return await request(app.getHttpServer())
      .post('/users/register')
      .send({ email: 'testexample@testexample.com' })
      .expect(201);
  });

  it('/user/register (POST) - should fail by entering the wrong email address.', () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send({ email: 'textexample.com' })
      .expect(500);
  });

  it('/auth/login (POST) - should allow a user to login with a valid code', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testexample@testexample.com',
        code: mockCode,
      });
    expect(response.status).toBe(201);
    expect(response.header).toHaveProperty('set-cookie');
  });

  afterAll(async () => {
    await app.close();
  });
});
