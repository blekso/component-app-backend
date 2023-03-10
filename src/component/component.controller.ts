import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseError } from '../common/dto/response.dto';
import { ComponentService } from './component.service';

@Controller('component')
export class ComponentController {
  constructor(private componentService: ComponentService) {}

  @Get(':id')
  @ApiOperation({
    tags: [`Component`],
    summary: 'Component reviews',
  })
  @ApiResponse({
    status: 200,
    description: 'Return component reviews',
  })
  @ApiResponse({
    status: 404,
    description: 'Empty response.',
    type: null,
  })
  async getReviewsById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      return await this.componentService.getReviewsById(id);
    } catch (error) {
      if (error.status) response.status(error.status);
      else response.status(500);
      return new ResponseError('COMPONENT.GET_BY_ID', error);
    }
  }
}
