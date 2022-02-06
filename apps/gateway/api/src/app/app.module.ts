import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GatewayApiAppService } from '@vnm/domain';
import { PrismaClientService } from '@vnm/shared';
import { join } from 'path';

import { AppController } from './app.controller';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api/gateway*', '/api/dashboard*', '/dashboard*', '/configuration*', '/back-office*'],
    }),
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [GatewayApiAppService, PrismaClientService],
})
export class AppModule {}
