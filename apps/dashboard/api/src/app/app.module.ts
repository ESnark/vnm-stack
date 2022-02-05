import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { DashboardApiAppService } from '@vnm/domain';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api*', '/dashboard/api*']
    })
  ],
  controllers: [AppController],
  providers: [DashboardApiAppService],
})
export class AppModule {}
