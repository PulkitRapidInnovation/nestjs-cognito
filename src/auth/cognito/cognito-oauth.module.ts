import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthConfig } from '../auth.config';
import { CognitoOauthController } from './cognito-oauth.controller';
import { CognitoService } from './cognito-oauth.service';
import { CognitoOauthStrategy } from './cognito-oauth.strategy';

@Module({
    imports: [UsersModule],
    controllers: [CognitoOauthController],
    providers: [CognitoOauthStrategy, CognitoService, AuthConfig],
    exports: [CognitoService]
})
export class CognitoOauthModule {}
