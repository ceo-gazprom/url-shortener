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
import { LongLinkDto } from './dto/long-link.dto';
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
  @ApiResponse({
    status: 400,
    description: 'Exception: bad short link.',
    type: ErrorResponse,
  })
  async redirect(@Param('urlCode') shortLink: string, @Res() res: Response) {
    /** Validate incoming param */
    const isValidate = this.linkService.validateShortLink(shortLink);

    if (!isValidate) {
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
  async createShortLink(@Body() body: LongLinkDto) {
    const shortUrl = await this.linkService.createShort(body.longLink);
    return { status: 'success', shortLink: shortUrl };
  }
}
