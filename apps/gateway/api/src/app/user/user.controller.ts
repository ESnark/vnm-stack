import { Body, Controller, Post, Get, Put, Delete, Param, UseGuards } from '@nestjs/common'
import { UserService, JwtAuthGuard } from '@vnm/domain'
import { User, UserRole } from '@vnm/model'
import { Roles } from '@vnm/shared'

@Controller('api/gateway/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() data: User): Promise<User> {
    return this.service.create(data)
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  findAll(): Promise<User[]> {
    return this.service.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  findOne(@Param() name: string): Promise<User | undefined> {
    return this.service.findOne(name)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  updateOne(@Param() id: number, @Body() data: User): Promise<any> {
    return this.service.updateOne(id, data)
  }

  @UseGuards()
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  deleteOne(@Param() id: number): Promise<any> {
    return this.service.deleteOne(id)
  }
}
