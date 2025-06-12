import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
