/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWristbandDetailDto } from './dto/create-wristband_detail.dto';
import { UpdateWristbandDetailDto } from './dto/update-wristband_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WristbandDetail } from './entities/wristband_detail.entity';
import { Repository } from 'typeorm';
import { Wristband } from '../wristbands/entities/wristband.entity';
import { Playground } from '../playgrounds/entities/playground.entity';

@Injectable()
export class WristbandDetailsService {
  constructor(
    @InjectRepository(WristbandDetail)
    private wristbandDetailRepository: Repository<WristbandDetail>,
    @InjectRepository(Wristband)
    private wristbandRepository: Repository<Wristband>,
    @InjectRepository(Playground)
    private playgroundRepository: Repository<Playground>,
  ) {}
  async create(CreateWristbandDetailDto: CreateWristbandDetailDto) {
    const wristband = await this.wristbandRepository.findOneBy({
      id: CreateWristbandDetailDto.wristbandId,
    });
    const playground = await this.playgroundRepository.findOneBy({
      id: CreateWristbandDetailDto.playId,
    });
    const wd = new WristbandDetail();
    wd.sum = CreateWristbandDetailDto.sum;
    wd.wristband = wristband;
    wd.playground = playground;
    return this.wristbandDetailRepository.save(wd);
  }

  findAll() {
    return this.wristbandDetailRepository.find({
      relations: ['wristband', 'playground'],
    });
  }

  async findOne(id: number) {
    const Order = await this.wristbandDetailRepository.findOne({
      where: { id: id },
      relations: ['wristband', 'playground'],
    });
    if (!Order) {
      throw new NotFoundException('WristbandDetail not found');
    } else {
      return Order;
    }
  }

  async update(id: number, updateWristbandDetailDto: UpdateWristbandDetailDto) {
    const wristbandDetail = await this.wristbandDetailRepository.findOneBy({
      id: id,
    });
    if (!wristbandDetail) {
      throw new NotFoundException('Wristband Detail not found');
    }
    return await this.wristbandDetailRepository.save({
      ...wristbandDetail,
      ...updateWristbandDetailDto,
    });
  }

  async remove(id: number) {
    const wristbandDetail = await this.wristbandDetailRepository.findOneBy({
      id: id,
    });
    if (!wristbandDetail) {
      throw new NotFoundException('Wristband Detail not found');
    }
    return this.wristbandDetailRepository.softRemove(wristbandDetail);
  }
}
