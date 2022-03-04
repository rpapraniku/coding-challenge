import { Bind, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CronExpression } from '@nestjs/schedule';
import { Asset } from '@prisma/client';
import { lastValueFrom } from 'rxjs';
import { CronJobService } from './cronJobService/cronjob.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private dataStreamCronJob: string = "data-streams";

  constructor(
    @Inject('COMMUNICATION') private readonly client: ClientProxy,
    private prisma: PrismaService, private cronJobService: CronJobService) { }

  async start(assetName: string) {
    let cronJobObj = this.cronJobService.addCronJob(this.dataStreamCronJob, CronExpression.EVERY_MINUTE);
    cronJobObj.addCallback(await this.dataStreamsHandler.bind(this, assetName))
    cronJobObj.start();
  }

  dataStreamsHandler = async function (assetName: string) {
    let assetRes = await lastValueFrom<any>(this.client.send('get_data_stream', { name: assetName }));
    console.log(assetRes);
    return this.prisma.asset.create({
      data: {
        id: assetRes.data.id,
        rank: parseInt(assetRes.data.rank) || 0,
        symbol: assetRes.data.symbol,
        name: assetRes.data.name,
        supply: parseInt(assetRes.data.supply) || 0,
        maxSupply: parseInt(assetRes.data.maxSupply) || 0,
        marketCapUsd: parseInt(assetRes.data.marketCapUsd) || 0,
        volumeUsd24Hr: parseInt(assetRes.data.volumeUsd24Hr) || 0,
        priceUsd: parseInt(assetRes.data.priceUsd) || 0,
        changePercent24Hr: parseInt(assetRes.data.changePercent24Hr) || 0,
        vwap24Hr: parseInt(assetRes.data.vwap24Hr) || 0
      }
    })
  };

  stop() {
    this.cronJobService.stop(this.dataStreamCronJob);
    this.logger.debug('Job has been stopped!');
  }

  async getdata() {
    return await this.prisma.asset.findMany();
  }

}


