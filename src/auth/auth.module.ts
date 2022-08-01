import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { CognitoOauthModule } from './cognito/cognito-oauth.module';

@Module({
    controllers: [AuthController],
    imports: [PassportModule, CognitoOauthModule],
    providers:[AuthConfig]
})
export class AuthModule {}
