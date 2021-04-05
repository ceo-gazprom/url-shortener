export interface RedisCacheServiceInterface {
  get(key): Promise<string>;
  set(key, value): Promise<void>;
}
