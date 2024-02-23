import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWristbandDetailDto } from './dto/create-wristband_detail.dto';
import { UpdateWristbandDetailDto } from './dto/update-wristband_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WristbandDetail } from './entities/wristband_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WristbandDetailsService {
  constructor(
    @InjectRepository(WristbandDetail)
    private wristbandDetailRepository: Repository<WristbandDetail>,
  ) {}
  create(CreateWristbandDetailDto: CreateWristbandDetailDto) {
    return this.wristbandDetailRepository.save(CreateWristbandDetailDto);
  }

  findAll() {
    return this.wristbandDetailRepository.find();
  }

  async findOne(id: number) {
    const wristbandDetail = await this.wristbandDetailRepository.findOneBy({
      id: id,
    });
    if (!wristbandDetail) {
      throw new NotFoundException('Wristband Detail not found');
    } else {
      return wristbandDetail;
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
