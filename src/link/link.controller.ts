import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Redirect,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { LinkService } from './link.service';
import { LongLinkDto } from './dto/long-link.dto';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get(':urlCode')
  @Redirect()
  @ApiResponse({ status: 302, description: 'Redirect on url.' })
  @ApiResponse({
    status: 404,
    description: 'Exception: not exist short link.',
  })
  @ApiResponse({
    status: 400,
    description: 'Exception: bad short link.',
  })
  async redirect(@Param('urlCode') shortLink: string) {
    /** Validate incoming param */
    const isValidate = this.linkService.validateShortLink(shortLink);

    if (!isValidate)
      throw new HttpException(
        'Exception: bad short link.',
        HttpStatus.BAD_REQUEST,
      );

    const url = await this.linkService.getLongByShort(shortLink);

    if (!url)
      throw new HttpException(
        'Exception: not exist short link.',
        HttpStatus.NOT_FOUND,
      );

    return {
      url: url,
      statusCode: HttpStatus.FOUND,
    };
  }

  @Post('create')
  async createShortLink(@Body() body: LongLinkDto) {
    const shortUrl = await this.linkService.createShort(body.longLink);
    if (!shortUrl)
      throw new HttpException(
        'Exception: invalid link.',
        HttpStatus.BAD_REQUEST,
      );

    return { statusCode: HttpStatus.OK, shortLink: shortUrl };
  }
}
