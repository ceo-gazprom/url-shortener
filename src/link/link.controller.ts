import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiMovedPermanentlyResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LinkService } from './link.service';
//import { ShortLinkDto, LongLinkDto } from './dto/short-link.dto';
import { ShortenerResponse } from './interfaces/link-response.interface';
import { ErrorResponse } from './classes/response.class';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get(':urlCode')
  @ApiMovedPermanentlyResponse({ status: 200, description: 'Redirect on url.' })
  @ApiResponse({
    status: 404,
    description: 'Exception: not exist short link.',
    type: ErrorResponse,
  })
  async redirect(@Param('urlCode') shortLink: string, @Res() res: Response) {
    console.log(shortLink);
    const validation = this.linkService.validateShortLink(shortLink);
    console.log(validation);
    if (!validation) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Exception: bad short link.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const url = await this.linkService.getLongByShort(shortLink);

    if (!url) {
      throw new HttpException(
        {
          status: 'error',
          error: 'Exception: not exist short link.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return res.redirect(url);
  }

  @Post('create')
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  createShortLink(@Body() body: any) {}
}
