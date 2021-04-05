import { RedisCacheServiceInterface } from './redis-cache-service.interface';

export class RedisCacheServiceMock implements RedisCacheServiceInterface {
  public storage: { [key: string]: string } = {};

  async get(key): Promise<string> {
    if (key in this.storage) return this.storage[key];
    return undefined;
  }

  async set(key, value): Promise<void> {
    this.storage[key] = value;
  }
}
