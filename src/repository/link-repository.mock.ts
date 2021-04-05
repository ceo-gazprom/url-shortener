import { LinkEntity } from '../entities/link.entity';
import { LinkRepositoryInterface } from './link-repository.interface';

export class LinkRepositoryMock implements LinkRepositoryInterface {
  async addClick(short: string): Promise<void> {
    if (!short) return undefined;
  }
  async createLink(long: string, short: string): Promise<void> {
    if (!long || !short) return undefined;
  }
  async getByShort(short: string): Promise<LinkEntity> {
    const link = new LinkEntity();
    link.id = 1;
    link.short = short;
    link.long = 'htttp://test.ru';

    return link;
  }
  async getByLong(long: string): Promise<LinkEntity> {
    const link = new LinkEntity();
    link.id = 1;
    link.short = 'abcdeabcde';
    link.long = long;

    return link;
  }
}
