/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Playground } from '../playgrounds/entities/playground.entity';
import { Wristband } from '../wristbands/entities/wristband.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Wristband)
    private wristbandRepository: Repository<Wristband>,
    @InjectRepository(Playground)
    private playgroundRepository: Repository<Playground>,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    const wristband = await this.wristbandRepository.findOneBy({
      id: createReviewDto.wristbandId,
    });
    const playground = await this.playgroundRepository.findOneBy({
      id: createReviewDto.playId,
    });
    const review: Review = new Review();
    review.rate = createReviewDto.rate;
    review.text = createReviewDto.text;
    review.wristband = wristband;
    review.playground = playground;
    return this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find({
      relations: ['wristband', 'playground'],
    });
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: id },
      relations: ['wristband', 'playground'],
    });
    if (!review) {
      throw new NotFoundException('review not found');
    } else {
      return review;
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOneBy({ id: id });
    if (!review) {
      throw new NotFoundException('review not found');
    }
    return await this.reviewRepository.save({
      ...review,
      ...updateReviewDto,
    });
  }

  async remove(id: number) {
    const review = await this.reviewRepository.findOneBy({ id: id });
    if (!review) {
      throw new NotFoundException('review not found');
    }
    return this.reviewRepository.softRemove(review);
  }
}
