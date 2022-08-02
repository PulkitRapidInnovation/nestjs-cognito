import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESSION_COOKIE_KEY } from 'src/constants';


export type JwtPayload = { sub: string; username: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const extractJwtFromCookie = (req) => {
            let token = null;

            if (req && req.cookies) {
                token = req.cookies[SESSION_COOKIE_KEY];
            }
            return token;
        };

        super({
            jwtFromRequest: extractJwtFromCookie,
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: JwtPayload) {
        console.log("🚀 ~ file: jwt-auth.strategy.ts ~ line 30 ~ JwtAuthStrategy ~ validate ~ payload", payload)
        return { id: payload.sub, username: payload.username };
    }
}
