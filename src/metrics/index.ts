import { CronJob } from "cron";
import { info } from "./info";
import { tool_temperature, bed_temperature } from "./temperature";

export class Metrics {
  public cron: string;
  cronJob: CronJob;

  constructor(cron: string) {
    this.cron = cron;
    this.cronJob = new CronJob(this.cron, async () => {
      try {
        await this._collect_temperature();
        await this._collect_info();
      } catch (e) {
        console.error(e);
      }
    });
  }

  private async _collect_temperature(): Promise<void> {
    await tool_temperature();
    await bed_temperature();
  }

  private async _collect_info(): Promise<void> {
    await info();
  }

  public async collect(): Promise<void> {
    // Start job
    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }
}
