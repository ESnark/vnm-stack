import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { loadConfigJson } from '@vnm/shared'
const config = loadConfigJson()

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user) return next()

    const accessToken = req?.headers['authorization']
    let user

    try {
      user = verify(accessToken, config?.AUTH?.SECRET)
    } catch (error) {
      throw new ForbiddenException('Please register or sign in')
    }

    if (user) req.user = user
    next()
  }
}
