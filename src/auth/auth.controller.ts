import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(
    @Body() data: LoginDto
    ) {
    const usertoken = await this.authService.validateUser(data);

    if (!usertoken) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return usertoken;
    }
}