import { Module } from '@nestjs/common';
import { GatewayApiAppService } from '@vnm/domain';

import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GatewayApiAppService],
})
export class AppModule {}
