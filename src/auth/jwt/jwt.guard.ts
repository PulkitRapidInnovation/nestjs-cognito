import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpStatus,
    HttpException,
    applyDecorators,
    UseGuards,
    createParamDecorator
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        if (req.headers && req.headers.authorization) {
            req.user = await this.validateToken(req.headers.authorization);
        }

        return true;
    }

    async validateToken(auth: string) {
        try {
            if (auth.split(' ')[0] !== 'Bearer')
                throw new HttpException(
                    'jwt bearer missing',
                    HttpStatus.FORBIDDEN
                );
            const token = auth.split(' ')[1];
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (err) {
            if (err.message == 'jwt expired') throw new Error('JWT_EXPIRED');
            else if (err.message == 'invalid token')
                throw new Error('INVALID_TOKEN');
            else if (err.message == 'secret or public key must be provided')
                throw new Error('JWT_SECRET_OR_PUBLIC_KEY');
            else if (err.message == 'jwt bearer missing')
                throw new Error('JWT_BEARER_MISSING');
        }
    }
}

export function Auth() {
    return applyDecorators(UseGuards(AuthGuard));
}

export const GetUserId = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        return req.user;
    }
);
