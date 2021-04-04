import { Repository, EntityRepository } from 'typeorm';
import { LinkEntity } from '../entities/link.entity';

@EntityRepository(LinkEntity)
export class LinkRepository extends Repository<LinkEntity> {
  /**
   * Add new link to the DB
   * @param long - url link
   * @param short - url code
   * @returns result of adding to the database
   */
  async createLink(long: string, short: string): Promise<boolean> {
    if (!long || !short || short.length < 6) return false;

    try {
      await this.insert({ long, short });
    } catch (error) {
      console.error('[LinkRepository.createLink] - SQL', error);
      return false;
    }
    return true;
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
      console.error('[LinkRepository.getByShort] - SQL', error);
      return undefined;
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
      console.error('[LinkRepository.getByLong] - SQL', error);
      return undefined;
    }
    return result;
  }
}
