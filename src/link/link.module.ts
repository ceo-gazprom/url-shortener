import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { LinkRepository } from '../repository/link.repository';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    TypeOrmModule.forFeature([LinkRepository]),
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
