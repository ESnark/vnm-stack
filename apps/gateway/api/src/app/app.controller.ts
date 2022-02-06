import { Body, Controller, Get, Post } from '@nestjs/common';

import { GatewayApiAppService } from '@vnm/domain';
import { PrismaClientService } from '@vnm/shared';

import { Role, User as UserModel } from '@prisma/client';

@Controller('api/gateway')
export class AppController {
  constructor(
    private readonly appService: GatewayApiAppService,
    private readonly dbService: PrismaClientService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('user')
  async createUser(@Body() userData: {
    email: string,
    password: string,
    name: string,
    role: Role,
  }): Promise<UserModel> {
    const { email, password, name, role } = userData;
    return this.dbService.user.create({
      data: { email, password, name, role: !role ? Role.USER : role }
    })
  }
}
