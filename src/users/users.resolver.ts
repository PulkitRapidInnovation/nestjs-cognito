import { Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindManyOptions } from 'typeorm';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard';
import { CurrentUser } from '../auth/graphql/gql-auth.decorator';
import { User } from 'src/entities/user.entity';

@Resolver((_of) => User)
export class UsersResolver {
    constructor(@Inject(UsersService) private usersService: UsersService) {}

    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }
    // @Query((_returns) => [User])
    // async users(params: FindManyOptions<User> = {}): Promise<User[]> {
    //     return this.usersService.findAll(params);
    // }

    @Query((_returns) => User)
    @UseGuards(GqlAuthGuard)
    whoAmI(@CurrentUser() user: User) {
        console.log(
            '🚀 ~ file: users.resolver.ts ~ line 26 ~ UsersResolver ~ whoAmI ~ user',
            user
        );

        return this.usersService.findOne({ where: { id: user.id } });
    }
}
