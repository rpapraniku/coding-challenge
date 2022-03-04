import { Injectable, Logger } from "@nestjs/common";
import { CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
export class CronJobService {
    private readonly logger = new Logger(CronJobService.name);

    constructor(private schedulerRegistry: SchedulerRegistry) { }

    addCronJob(name: string, cronExpression: CronExpression): CronJob {
        if (!this.schedulerRegistry.doesExists("cron", name)) {
            const job = new CronJob(cronExpression, () => {
                this.logger.debug('Called every minute');
            });
            this.schedulerRegistry.addCronJob(name, job);
            return job;
        }

        return this.schedulerRegistry.getCronJob(name);;
    }

    stop(jobName: string) {
        let job = this.schedulerRegistry.getCronJob(jobName);
        job.stop();
    }
}