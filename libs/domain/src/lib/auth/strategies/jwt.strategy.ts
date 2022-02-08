import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { loadGatewayConfiguration } from "@vnm/shared";
import { AuthService } from '../auth.service'

const config = loadGatewayConfiguration()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config?.AUTH?.SECRET
    })
  }

  async validate(payload: any): Promise<any> {
    return { name: payload.name, sub: payload.id, role: payload.role};
  }
}
