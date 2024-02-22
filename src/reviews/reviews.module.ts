import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Playground } from '../playgrounds/entities/playground.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Customer, Playground])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
