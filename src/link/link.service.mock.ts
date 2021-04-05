import { LinkServiceInterface } from './link-service.interface';

export class LinkServiceMock implements LinkServiceInterface {
  async createShort(longLink: string): Promise<string> {
    if (!longLink) return undefined;
    return 'abcdeabcde';
  }

  async getLongByShort(shortUrl: string): Promise<string> {
    if (!shortUrl) return undefined;
    const isValidate = this.validateShortLink(shortUrl);
    if (shortUrl == 'abcdeabcde' && isValidate) return 'http://test.ru';
    return undefined;
  }

  validateShortLink(urlCode: string): boolean {
    if (typeof urlCode == 'string' && urlCode.length == 10) return true;
    return false;
  }
}
