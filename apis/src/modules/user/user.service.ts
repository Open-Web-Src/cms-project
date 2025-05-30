import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  create(data: CreateUserDto) {
    const user = this.users.create(data);
    return this.users.save(user);
  }

  findAll() {
    return this.users.find();
  }
}
