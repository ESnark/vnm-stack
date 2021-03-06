import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { GatewayConfiguration, loadConfigJson } from "@vnm/shared";
import { EntitiesModule } from "../entities/entity.module";

import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

import { AuthMiddleware } from './auth.middleware'

const config: GatewayConfiguration = loadConfigJson()

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config?.AUTH?.SECRET,
      signOptions: { expiresIn: config?.AUTH.EXPIRED_ON }
    }),
    EntitiesModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthMiddleware],
  exports: [AuthService, AuthMiddleware]
})
export class AuthModule {}
