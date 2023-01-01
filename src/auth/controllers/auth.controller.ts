import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { SignInDto, SignUpDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    tags: [`Auth`],
    summary: 'Regsiter',
  })
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: [`Auth`],
    summary: 'Login',
  })
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
