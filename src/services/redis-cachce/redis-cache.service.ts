import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisCacheServiceInterface } from './redis-cache-service.interface';
@Injectable()
export class RedisCacheService implements RedisCacheServiceInterface {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key) {
    return await this.cache.get<string>(key);
  }

  async set(key, value) {
    await this.cache.set(key, value);
  }
}
