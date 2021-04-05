export interface LinkServiceInterface {
  createShort(longLink: string): Promise<string>;
  getLongByShort(shortUrl: string): Promise<string>;
  validateShortLink(urlCode: string): boolean;
}
