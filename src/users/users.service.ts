import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    create(user: CreateUserDto) {
        return this.usersRepository.save(user);
    }

    findOne(params: FindOneOptions<User> = {}) {
        return this.usersRepository.findOne(params);
    }

    findAll(params: FindManyOptions<User> = {}) {
        return this.usersRepository.find(params);
    }
}
