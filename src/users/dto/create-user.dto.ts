import { Provider } from '../common/user';

export class CreateUserDto {
    provider: Provider;
    providerId: string;
    username: string;
    name: string;
}
