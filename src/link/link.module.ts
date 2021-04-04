import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { LinkRepository } from '../repository/link.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LinkRepository])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
