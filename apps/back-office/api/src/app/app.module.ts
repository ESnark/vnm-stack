import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { BackOfficeApiAppService } from '@vnm/domain';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [BackOfficeApiAppService],
})
export class AppModule {}
