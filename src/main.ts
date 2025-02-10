 import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '././app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS to allow frontend access
  app.enableCors({
    origin: 'http://localhost:5173', // Change this to your frontend URL
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
} 
bootstrap();

