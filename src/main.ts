 import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,  // Strips out properties not defined in DTOs
    forbidNonWhitelisted: true,  // Throws an error if extra properties are sent
    transform: true,  // Automatically transform payloads to DTO instances
  }));

  app.enableCors(); // Enable CORS
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

