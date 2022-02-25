import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

import { TokenPayload } from '@vnm/model'
import { GatewayConfiguration, loadConfigJson } from "@vnm/shared";
import { UserService } from '../entities/user/user.service'
import { bcryptCompare } from '../utilities/bcrypt.util'

const config: GatewayConfiguration = loadConfigJson()

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email)
    if (user && await bcryptCompare(pass, user.password)) {
      const { password, ...result } = user
      return result;
    }

    return null
  }

  async getJwtAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: config.AUTH.SECRET,
      expiresIn: config.AUTH.EXPIRED_ON
    })
  }

  async getJwtRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: config.AUTH.REFRESH_SECRET,
      expiresIn: config.AUTH.REFRESH_EXPIRED_ON,
    })
  }
}
