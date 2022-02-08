import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService, User } from '@vnm/domain'
import { LocalAuthGuard } from "@vnm/domain";


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: User): Promise<Response> {
    return this.authService.login(user)
  }
}
