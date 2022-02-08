import { Body, Controller, Post, Get, Put, Delete, Param, UseGuards } from '@nestjs/common'
import { UserService, User, JwtAuthGuard } from '@vnm/domain'

@Controller('api/gateway/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() data: User): Promise<User> {
    return this.service.create(data)
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  findOne(@Param() name: string): Promise<User | undefined> {
    return this.service.findOne(name)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param() id: number, @Body() data: User): Promise<any> {
    return this.service.updateOne(id, data)
  }

  @UseGuards()
  @Delete(':id')
  deleteOne(@Param() id: number): Promise<any> {
    return this.service.deleteOne(id)
  }
}
