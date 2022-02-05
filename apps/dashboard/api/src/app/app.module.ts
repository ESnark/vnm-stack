import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DashboardApiAppService } from '@vnm/domain';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DashboardApiAppService],
})
export class AppModule {}
