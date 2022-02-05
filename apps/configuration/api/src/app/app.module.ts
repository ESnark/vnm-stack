import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigurationApiAppService } from '@vnm/domain';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ConfigurationApiAppService],
})
export class AppModule {}
