import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserReviewDto } from './dto';
import { JwtGuard } from '../auth/guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseError } from '../common/dto/response.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('review')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtGuard)
  @ApiOperation({
    tags: [`User`],
    summary: 'Create new User review',
  })
  @ApiBody({ type: UserReviewDto })
  @ApiResponse({
    status: 200,
    description: 'User review successful',
  })
  @ApiResponse({
    status: 404,
    description: 'Empty response.',
    type: null,
  })
  async review(
    @Body() dto: UserReviewDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      return await this.userService.review(dto);
    } catch (error) {
      if (error.status) response.status(error.status);
      else response.status(500);
      return new ResponseError('USER.REVIEW', error);
    }
  }
}
