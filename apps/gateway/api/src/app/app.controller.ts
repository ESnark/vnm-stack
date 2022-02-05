import { Controller, Get } from '@nestjs/common';

import { GatewayApiAppService } from '@vnm/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: GatewayApiAppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
