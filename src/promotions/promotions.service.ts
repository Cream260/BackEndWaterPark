/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}
  create(createPromotionDto: CreatePromotionDto) {
    return this.promotionRepository.save(createPromotionDto);
  }

  findAll() {
    return this.promotionRepository.find();
  }

  async findOne(id: number) {
    const promotion = await this.promotionRepository.findOneBy({ id: id });
    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    } else {
      return promotion;
    }
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionRepository.findOneBy({ id: id });
    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }
    return await this.promotionRepository.save({
      ...promotion,
      ...updatePromotionDto,
    });
  }

  async remove(id: number) {
    const promotion = await this.promotionRepository.findOneBy({ id: id });
    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }
    return this.promotionRepository.softRemove(promotion);
  }
}
