import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthorizerGuard } from '../cognito.guard';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { CognitoOauthGuard } from './cognito-oauth.guard';
import { CognitoService } from './cognito-oauth.service';

@Controller('auth/cognito')
export class CognitoOauthController {
    constructor(
        private readonly cognitoService: CognitoService,
        private jwtAuthService: JwtAuthService
    ) {}

    @Get()
    @UseGuards(CognitoOauthGuard)
    async cognitoAuth(@Req() _req) {
        // Guard redirects
    }

    @Get('redirect')
    @UseGuards(CognitoOauthGuard)
    async cognitoAuthRedirect(@Req() req) {
        const { accessToken } = this.jwtAuthService.login(req.user);
        console.log(
            '🚀 ~ file: cognito-oauth.controller.ts ~ line 25 ~ CognitoOauthController ~ cognitoAuthRedirect ~ accessToken',
            accessToken
        );
        if (!req.user) {
            return 'No user for Google';
        }
        return {
            message: 'User Info from Google',
            user: req.user
        };
    }

    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // public async showProfile(@Req() req: Request, @Res() res: Response) {
    //     console.log(res);
    //     return;
    // }

    // @Get('current')
    // @UseGuards(AuthorizerGuard)
    // getCurrentUser() {
    //     return this.cognitoService.getCurrentUser();
    // }
}
