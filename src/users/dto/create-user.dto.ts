import { Provider } from '../common/user';

export class CreateUserDto {
    provider: Provider;
    isEmailVerified: boolean;
    username: string;
    email: string;
    sub: string;
}
