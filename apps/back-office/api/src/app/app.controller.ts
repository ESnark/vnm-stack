import { Controller, Get } from '@nestjs/common';

import { BackOfficeApiAppService } from '@vnm/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: BackOfficeApiAppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
