import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login() {
    this.logger.log('Login: generando URL de autorización de GitHub');
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID || '',
      redirect_uri: process.env.GITHUB_REDIRECT_URI || '',
      scope: 'read:user user:email',
    });
    return {
      url: `https://github.com/login/oauth/authorize?${params.toString()}`,
    };
  }

  @Get('callback')
  async callback(@Query('code') code: string) {
    this.logger.log(`Callback recibido (code presente: ${code})`);
    const response = await this.authService.getAccessToken(code);
    return response;
  }
}
