import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { GatewayConfiguration, loadConfiguration } from "@vnm/shared";
import { EntitiesModule } from "../entities/entity.module";

import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

const config: GatewayConfiguration = loadConfiguration()

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config?.AUTH?.SECRET,
      signOptions: { expiresIn: config?.AUTH.EXPIRED_ON }
    }),
    EntitiesModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
