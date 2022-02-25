import { Request } from 'express'
import { TokenPayload } from '@vnm/model'

export interface RequestWithUser extends Request {
  user: TokenPayload
}
