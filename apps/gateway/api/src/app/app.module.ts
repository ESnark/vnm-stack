import { Module } from '@nestjs/common';
import { join } from 'path';
import { getMetadataArgsStorage } from 'typeorm';

// Modules
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from '@vnm/domain';
import { DashboardModule } from './dashboard/dashboard.module';

// Services
import { GatewayApiAppService } from '@vnm/domain';
import { ormConfigService } from '@vnm/shared';

// Controllers
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api/gateway*', '/api/dashboard*', '/dashboard*', '/configuration*', '/back-office*'],
    }),
    TypeOrmModule.forRoot({
      ...ormConfigService.getTypeOrmConfig(),
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
    }),
    DashboardModule,
    EntitiesModule,
  ],
  controllers: [AppController, UserController],
  providers: [GatewayApiAppService],
})
export class AppModule {}
