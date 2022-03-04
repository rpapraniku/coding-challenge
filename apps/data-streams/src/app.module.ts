import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import { CronJobService } from './cronJobService/cronjob.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([{
      name: 'COMMUNICATION',
      transport: Transport.TCP,
    }])
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CronJobService]
})
export class AppModule { }
