import { Controller, Get } from '@nestjs/common';

import { ConfigurationApiAppService } from '@vnm/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: ConfigurationApiAppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
