import { Controller, Post, UseGuards, Req, Res, UnauthorizedException, HttpCode, Get } from '@nestjs/common';
import { AuthService, RequestWithUser, LocalAuthGuard, JwtAuthGuard, UserService, JwtRefreshGuard } from '@vnm/domain'
import { TokenPayload } from '@vnm/model'
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser, @Res() res: Response): Promise<Response> {
    const { user } = req;
    if (!user) throw new UnauthorizedException({ error: 'User not found' })
    const payload: TokenPayload = { name: user.name, sub: user.id, email: user.email, role: user.role }
    const accessToken = await this.authService.getJwtAccessToken(payload)
    const refreshToken = await this.authService.getJwtRefreshToken(payload)
    return res.json({ accessToken, refreshToken })
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: RequestWithUser): Promise<any> {
    await this.userService.removeRefreshToken(req.user.id);
  }

  // access token 인증
  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user;
    return user;
  }

  // Refresh token으로 access token 발행
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser, @Res() res: Response) {
    const accessToken = this.authService.getJwtAccessToken(request.user);

    return res.json({ accessToken });
  }
}
