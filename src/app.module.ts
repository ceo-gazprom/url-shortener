import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './link/link.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'produser',
      password: 'prodpassword',
      database: 'prod',
      entities: ['**/*.entity.js'],
      synchronize: true,
    }),
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
