import { Module } from '@nestjs/common';
import { PlaygroundsService } from './playgrounds.service';
import { PlaygroundsController } from './playgrounds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playground } from './entities/playground.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playground])],
  controllers: [PlaygroundsController],
  providers: [PlaygroundsService],
})
export class PlaygroundsModule {}
