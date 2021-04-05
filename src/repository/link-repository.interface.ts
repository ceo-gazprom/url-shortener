import { LinkEntity } from '../entities/link.entity';

export interface LinkRepositoryInterface {
  addClick(short: string): Promise<void>;
  createLink(long: string, short: string): Promise<void>;
  getByShort(short: string): Promise<LinkEntity>;
  getByLong(long: string): Promise<LinkEntity>;
}
