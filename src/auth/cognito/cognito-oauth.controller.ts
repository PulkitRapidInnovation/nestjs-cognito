import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthorizerGuard } from '../cognito.guard';
import { CognitoOauthGuard } from './cognito-oauth.guard';
import { CognitoService } from './cognito-oauth.service';

@Controller('auth/cognito')
export class CognitoOauthController {
    constructor(private readonly cognitoService: CognitoService) {}

    @Get()
    @UseGuards(CognitoOauthGuard)
    async cognitoAuth(@Req() _req) {
        // Guard redirects
    }

    @Get('redirect')
    @UseGuards(CognitoOauthGuard)
    async cognitoAuthRedirect(@Req() req) {
        if (!req.user) {
            return 'No user for Google';
        }
        return {
            message: 'User Info from Google',
            user: req.user
        };
    }

    // @Get('current')
    // @UseGuards(AuthorizerGuard)
    // getCurrentUser() {
    //     return this.cognitoService.getCurrentUser();
    // }
}
