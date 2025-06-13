import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  global._sever = app;

  // thêm validationPipe dùng để validate dữ liệu đầu vào
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // tự động loại bỏ các field không được định ngĩa trong DTO
      forbidNonWhitelisted: true, // nếu có trường không khai báo trong DTO , thì sẽ ném ra lỗi 400 thay vì bỏ qua
      transform: true, // tự động chuyển đổi dữ liệu đầu vào (JSON) thành instance của class DTO
    }),
  );
  app.enableCors({
    origin: true, // Cho phép tất cả các domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Cho phép gửi cookies
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Masterclass - Blog app API')
    .setDescription('The NestJS API description')
    // .setTermsOfService('http://localhost:3000/terms-of-service')
    // .setLicense(
    //   'MIT License',
    //   'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    // )
    // .addServer('http://localhost:3000')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
