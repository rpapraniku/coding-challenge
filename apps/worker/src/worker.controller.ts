import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WorkerService } from './worker.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) { }

  @MessagePattern('get_data_stream')
  async getData(data: any): Promise<any> {
    let results = await this.workerService.getAssetRates(data.name);
    return results.data;
  }
}
