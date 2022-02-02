/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { loadMicroServiceConfiguration } from '@vnm/shared';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = loadMicroServiceConfiguration();
  const options: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
      host: config.TCP_HOST,
      port: config.TCP_PORT || 8300
    },
  };

  app.connectMicroservice(options);
  app.startAllMicroservices();

  const globalPrefix = config.GLOBAL_API_PREFIX || '/api';
  const port = config.HTTP_PORT || process.env.PORT || 8003;
  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}${globalPrefix}`
  );
}

bootstrap();
