import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) {}

    login(user: User) {
        console.log(
            '🚀 ~ file: jwt-auth.service.ts ~ line 17 ~ JwtAuthService ~ login ~ user',
            user
        );
        const payload: JwtPayload = {
            username: user.username,
            sub: user.sub,
            email: user?.email
        };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
