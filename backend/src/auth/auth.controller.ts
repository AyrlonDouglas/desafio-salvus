import { LocalAuthGuard } from './guards/local-auth.guard';
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('validate-token')
  async validateToken(@Request() req) {
    const {
      query: { token = '' },
    } = req;

    const isValid = await this.authService.validateToken(token);

    return { isValid };
  }
}
