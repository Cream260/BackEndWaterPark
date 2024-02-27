import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Playground } from '../playgrounds/entities/playground.entity';
import { Wristband } from '../wristbands/entities/wristband.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Playground, Wristband])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
