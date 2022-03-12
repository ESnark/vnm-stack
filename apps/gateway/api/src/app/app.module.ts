import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { join } from 'path';
import { getMetadataArgsStorage } from 'typeorm';

// Modules
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, EntitiesModule } from '@vnm/domain';
import { DashboardModule } from './dashboard/dashboard.module';

// Services
import { GatewayApiAppService } from '@vnm/domain';
import { ormConfigService } from '@vnm/shared';

// Controllers
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';

// Middleware
import { AuthMiddleware } from '@vnm/domain'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@vnm/shared'
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api/auth*', '/api/gateway*', '/api/dashboard*', '/dashboard*', '/configuration*', '/back-office*'],
    }),
    TypeOrmModule.forRoot({
      ...ormConfigService.getTypeOrmConfig(),
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
    }),
    DashboardModule,
    EntitiesModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    GatewayApiAppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware).forRoutes('*')
        .apply(AuthMiddleware)
        .exclude(...[
          { path: '/api/auth/login', method: RequestMethod.POST },
          { path: '/api/gateway/user', method: RequestMethod.POST }
        ])
        .forRoutes(...[
          { path: '/dashboard*', method: RequestMethod.ALL },
          { path: '/configuration*', method: RequestMethod.ALL },
          { path: '/back-office*', method: RequestMethod.ALL },
          { path: '/api*', method: RequestMethod.ALL },
        ])
  }
}
