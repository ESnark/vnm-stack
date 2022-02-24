import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { bcryptCompare, bcryptHash } from '../../utilities/bcrypt.util';
import { UserEntity } from './user.entity';
import { User } from '@vnm/model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>
  ) { }

  async create(data: User): Promise<User> {
    data.password = await bcryptHash(data.password);
    return this.repository.save(data);
  }

  updateOne(id: number, data: User): Promise<any> {
    return this.repository.update(id, data);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(email: string): Promise<User | undefined> {
    const user = this.repository.findOne({ email });
    if (!user) throw new HttpException('No user found for this email', HttpStatus.NOT_FOUND)

    return user
  }

  findOneById(id: number): Promise<User | undefined> {
    const user = this.repository.findOne({ id })
    if (!user) throw new HttpException('No user found for this ID', HttpStatus.NOT_FOUND)

    return user
  }

  deleteOne(id: number): Promise<any> {
    return this.repository.delete(id);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number): Promise<User | undefined> {
    const user: User = await this.findOneById(id)
    const isRefreshTokenMatching = await bcryptCompare(refreshToken, user.currentHashedRefreshToken)

    if (!isRefreshTokenMatching) return
    return user
  }
}
