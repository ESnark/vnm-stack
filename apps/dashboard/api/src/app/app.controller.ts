import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { DashboardApiAppService } from '@vnm/domain';
import { Observable, from } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: DashboardApiAppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern({ cmd: 'dashboard-sum' })
  accumulate(data: number[]): Observable<number> {
    console.log('calling sum from dashboard');
    const sum = data[0] + data[1] + data[2];
    return from([sum]);
  }
}
