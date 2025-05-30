import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Golbal Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Auto-transform payloads to DTO instances
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw if extra fields are sent
    }),
  );

  const config = app.get(ConfigService);
  const port: number = config.get<number>('server.port') ?? 3000;

  app.enableCors();

  await app.listen(port);
}
bootstrap();
