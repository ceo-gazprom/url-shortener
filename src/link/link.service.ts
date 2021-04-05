import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';

import { LinkServiceInterface } from './link-service.interface';
import { LinkRepository } from '../repository/link.repository';
import { RedisCacheService } from '../services/redis-cachce/redis-cache.service';

@Injectable()
export class LinkService implements LinkServiceInterface {
  constructor(
    @InjectRepository(LinkRepository)
    private readonly linkRepository: LinkRepository,
    private readonly redisCacheService: RedisCacheService,
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
    console.log(shortLink);
    await this.linkRepository.createLink(longLink, shortLink);

    return shortLink;
  }

  /**
   * Get long link from DB
   * @param shortUrl - url code
   * @returns long link
   */
  public async getLongByShort(shortUrl: string): Promise<string> {
    if (!shortUrl) return undefined;

    /** Check cache */
    const cached = await this.redisCacheService.get(shortUrl);
    if (cached !== undefined && cached !== null) {
      /** Increase clicks counter  */
      await this.linkRepository.addClick(shortUrl);
      return cached;
    }

    const result = await this.linkRepository.getByShort(shortUrl);
    if (!result) return undefined;

    /** Add to cahce */
    await this.redisCacheService.set(shortUrl, result.long);
    /** Increase clicks counter  */
    await this.linkRepository.addClick(result.short);

    return result.long;
  }

  /**
   * Validate short url
   * @param urlCode - short url
   * @returns result of validation
   */
  public validateShortLink(urlCode: string): boolean {
    if (typeof urlCode == 'string' && urlCode.length == 10) return true;
    return false;
  }

  /**
   * Generate new url code
   * @returns url code
   */
  private generateUrlCode(): string {
    return nanoid(10);
  }
}
