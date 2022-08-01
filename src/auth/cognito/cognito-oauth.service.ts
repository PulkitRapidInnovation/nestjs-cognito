import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AuthConfig } from 'src/auth/auth.config';

@Injectable()
export class CognitoService {
    private client: CognitoIdentityServiceProvider;
    protected user: GetUserResponse;
    constructor(
        @Inject(forwardRef(() => AuthConfig))
        private readonly authConfig: AuthConfig
    ) {
        this.client = new CognitoIdentityServiceProvider({
            region: this.authConfig.region
        });
    }
    public async getUserByToken(token: string): Promise<GetUserResponse> {
        this.user = await this.client
            .getUser({
                AccessToken: token
            })
            .promise();
        return this.user;
    }
    public loadCurrentUser(): GetUserResponse {
        return this.user;
    }
    // async getCurrentUser() {
    //     const cognitoUser = this.loadCurrentUser();
    //     const email = cognitoUser.UserAttributes.find(
    //         (it) => it.Name == 'email'
    //     ).Value;
    //     console.log("🚀 ~ file: cognito-oauth.service.ts ~ line 34 ~ CognitoService ~ getCurrentUser ~ email", email)
    //     return;
    // }
}
