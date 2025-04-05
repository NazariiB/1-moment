import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from 'db/database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomentEntity } from 'db/entity/moment.entity';

@Module({
  imports: [databaseProvider, TypeOrmModule.forFeature([MomentEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
