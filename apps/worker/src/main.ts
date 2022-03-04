import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkerModule, {
    // Setup communication protocol here
    transport: Transport.TCP
  });

  app.listen(async () => {
    console.log('Microservice is listening');
  });
}

bootstrap();
