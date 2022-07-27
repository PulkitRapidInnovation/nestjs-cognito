import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(
        @Body()
        registerRequest: {
            name: string;
            password: string;
            email: string;
        }
    ) {
        try {
            return await this.authService.registerUser(registerRequest);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')
    async login(
        @Body() authenticateRequest: { name: string; password: string }
    ) {
        try {
            return await this.authService.authenticateUser(authenticateRequest);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post('verify')
    async verifyUser(@Body() verifyUserDto: { name: string; code: string }) {
        try {
            return this.authService.verifyUser(verifyUserDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
