import { Repository, EntityRepository } from 'typeorm';
import { LinkEntity } from '../entities/link.entity';
import { LinkRepositoryInterface } from './link-repository.interface';

@EntityRepository(LinkEntity)
export class LinkRepository
  extends Repository<LinkEntity>
  implements LinkRepositoryInterface {
  /**
   * Increase clicks counter
   * @param short - url code
   * @returns void
   */
  async addClick(short: string): Promise<void> {
    if (!short) return undefined;

    try {
      const result = await this.update({ short }, { count: () => 'count + 1' });
      console.log(result);
    } catch (error) {
      throw new Error('[LinkRepository.createLink] - SQL');
    }
  }
  /**
   * Add new link to the DB
   * @param long - url link
   * @param short - url code
   * @returns result of adding to the database
   */
  async createLink(long: string, short: string): Promise<void> {
    if (!long || !short || short.length < 6) return undefined;

    try {
      await this.insert({ long, short });
    } catch (error) {
      throw new Error('[LinkRepository.createLink] - SQL');
    }
  }

  /**
   * Get data for short link from DB
   * @param short - url code
   * @returns Data object
   */
  async getByShort(short: string): Promise<LinkEntity> {
    if (!short) return undefined;

    let result: LinkEntity = undefined;
    try {
      result = await this.findOne({ short });
    } catch (error) {
      throw new Error('[LinkRepository.getByShort] - SQL');
    }
    return result;
  }

  /**
   * Get data for long link from DB
   * @param long - url link
   * @returns Data object
   */
  async getByLong(long: string): Promise<LinkEntity> {
    if (!long) return undefined;

    let result: LinkEntity = undefined;
    try {
      result = await this.findOne({ long });
    } catch (error) {
      throw new Error('[LinkRepository.getByLong] - SQL');
    }
    return result;
  }
}
