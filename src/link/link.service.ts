import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import validator from 'validator';
import shortId from 'shortid';

import { LinkServiceInterface } from './interfaces/link-service.interface';
import { LinkRepository } from '../repository/link.repository';

@Injectable()
export class LinkService implements LinkServiceInterface {
  constructor(
    @InjectRepository(LinkRepository)
    private readonly linkRepository: LinkRepository,
  ) {}

  /**
   * Create new url code for link
   * @param longLink - url link
   * @returns url code for link
   */
  public async createShort(longLink: string): Promise<string> {
    if (!longLink) return undefined;

    /** Check if the link exists in the database */
    const duplicate = await this.linkRepository.getByLong(longLink);
    if (duplicate) return duplicate.short;

    /** Create new link in the DB */
    const shortLink = this.generateUrlCode();
    const result = await this.linkRepository.createLink(longLink, shortLink);
    if (!result) return undefined;

    return shortLink;
  }

  /**
   * Get long link from DB
   * @param shortUrl - url code
   * @returns long link
   */
  public async getLongByShort(shortUrl: string): Promise<string> {
    if (!shortUrl) return undefined;

    const result = await this.linkRepository.getByShort(shortUrl);
    if (!result) return undefined;

    return result.long;
  }

  public validateLongLink(link: string): boolean {
    if (
      validator.isEmail(link) &&
      typeof link == 'string' &&
      link.length > 11 &&
      link.length < 255
    )
      return true;
    return false;
  }

  public validateShortLink(urlCode: string): boolean {
    if (typeof urlCode == 'string' && urlCode.length == 6) return true;
    return false;
  }

  /**
   * Generate new url code
   * @returns url code
   */
  private generateUrlCode(): string {
    return shortId.generate();
  }
}
