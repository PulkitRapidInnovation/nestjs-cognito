import { Controller, Get, Inject, Res } from '@nestjs/common';
import { Auth, GetUserId } from 'src/auth/jwt/jwt.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
    constructor(@Inject(UsersService) private usersService: UsersService) {}

    @Get('/me')
    @Auth()
    async me(@GetUserId() user) {
        console.log(
            '🚀 ~ file: users.resolver.ts ~ line 26 ~ UsersResolver ~ me ~ user',
            user
        );
        return this.usersService.findOne({ where: { sub: user?.sub } });
    }
}
