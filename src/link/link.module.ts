import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { LinkRepository } from '../repository/link.repository';
import { RedisCacheModule } from '../services/redis-cachce/redis-cachce.module';

@Module({
  imports: [RedisCacheModule, TypeOrmModule.forFeature([LinkRepository])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
