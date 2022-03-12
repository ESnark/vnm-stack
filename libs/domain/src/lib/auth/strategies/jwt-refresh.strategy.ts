import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { UserService } from '../../entities/user/user.service'
import { loadConfigJson } from '@vnm/shared'
import { TokenPayload, User } from '@vnm/model'

const config = loadConfigJson()

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.headers['refresh-token'] as string
      ]),
      secretOrKey: config?.AUTH?.REFRESH_SECRET,
      passReqToCallback: true,
    })
  }

  async validate(request: Request, payload: TokenPayload): Promise<User | undefined> {
    const refreshToken = request.headers.authorization
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.id as number)
  }
}
