import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import { LinkRepositoryMock } from '../repository/link-repository.mock';
import { LinkRepository } from '../repository/link.repository';
import { RedisCacheService } from '../services/redis-cachce/redis-cache.service';
import { RedisCacheServiceMock } from '../services/redis-cachce/redis-cache-service.mock';

describe('LinkService', () => {
  let linkService: LinkService;
  let redisCacheService: RedisCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        { provide: LinkRepository, useClass: LinkRepositoryMock },
        { provide: RedisCacheService, useClass: RedisCacheServiceMock },
      ],
    }).compile();

    linkService = module.get<LinkService>(LinkService);
    redisCacheService = module.get<RedisCacheService>(RedisCacheService);
  });

  it('LinkService - should be defined', () => {
    expect(linkService).toBeDefined();
  });

  it('Create short link ', async () => {
    // Mock private generateUrlCode method
    jest
      .spyOn<any, string>(linkService, 'generateUrlCode')
      .mockImplementationOnce(() => 'abcdeabcde');

    const short = await linkService.createShort('http://test.ru');
    expect(short).toEqual('abcdeabcde');
  });

  it('Create short link missing param', async () => {
    const result = await linkService.createShort(undefined);
    expect(result).toEqual(undefined);
  });

  it('Get long link missing param ', async () => {
    const result = await linkService.getLongByShort(undefined);
    expect(result).toEqual(undefined);
  });

  it('Get long link ', async () => {
    const long = await linkService.getLongByShort('abcdeabcde');
    expect(long).toEqual('htttp://test.ru');
  });

  it('Check cache', async () => {
    jest.spyOn(redisCacheService, 'get').mockResolvedValueOnce('test');
    const result = await linkService.getLongByShort('abcdeabcde');
    expect(result).toEqual('test');
  });

  describe('Test validator', () => {
    it('Should be valideted', () => {
      const result = linkService.validateShortLink('abcdeabcde');
      expect(result).toBe(true);
    });
    it('Should not be valideted shrter url code', () => {
      const result = linkService.validateShortLink('abcd');
      expect(result).toBe(false);
    });
    it('Should not be valideted longer url code', () => {
      const result = linkService.validateShortLink('abcdeabcdeabcde');
      expect(result).toBe(false);
    });
    it('Should not be valideted undefined', () => {
      const result = linkService.validateShortLink(undefined);
      expect(result).toBe(false);
    });
  });
});
