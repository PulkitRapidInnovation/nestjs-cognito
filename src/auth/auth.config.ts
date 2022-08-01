import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
    public userPoolId: string = process.env.COGNITO_USER_POOL_ID;
    public clientId: string = process.env.OAUTH_COGNITO_ID;
    public region: string = process.env.COGNITO_REGION;
    public authority = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
}
