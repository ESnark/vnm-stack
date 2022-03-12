import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express'
import { Logger } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('GatewayRequest', false)

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method} ${req.baseUrl}`)
    next();
  }
}
