import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersResolver],
    exports: [TypeOrmModule.forFeature([User]), UsersService]
})
export class UsersModule {}
