import { HttpService, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WorkerService {
  constructor(private httpService: HttpService) { }
  private apiBase = "http://api.coincap.io/v2/assets/";

  async getAssetRates(name: string) {
    return lastValueFrom(this.httpService.get(`${this.apiBase}/${name}`));
  }
}