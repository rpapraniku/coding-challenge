import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger("AppController");

  constructor(private readonly appService: AppService) { }

  @Get("get-data")
  async getData() {
    return this.appService.getdata();
  }

  @Get("start-streaming/:name")
  async startStreaming(@Param('name') name: string) {
    this.logger.log("Start job!");
    return this.appService.start(name);
  }

  @Get("stop-streaming")
  async stopStreaming() {
    this.logger.log("Stop job!");
    return this.appService.stop();
  }
}
