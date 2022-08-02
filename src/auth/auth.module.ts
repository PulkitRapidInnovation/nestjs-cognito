import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { CognitoOauthModule } from './cognito/cognito-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';

@Module({
    controllers: [AuthController],
    imports: [PassportModule, CognitoOauthModule, JwtAuthModule, UsersModule],
    providers: [AuthConfig]
})
export class AuthModule {}
