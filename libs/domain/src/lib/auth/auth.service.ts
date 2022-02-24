import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

import { User } from '@vnm/model'
import { UserService } from '../entities/user/user.service'
import { bcryptCompare } from '../utilities/bcrypt.util'

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

  async login(loginUser: User): Promise<any> {
    const user = await this.userService.findOne(loginUser.email);
    if (user) {
      const payload = { name: user.name, sub: user.id, email: user.email, role: user.role }
      return { access_token: this.jwtService.sign(payload) }
    } else {
      throw new UnauthorizedException({
        error: 'There is no user'
      })
    }
  }
}
