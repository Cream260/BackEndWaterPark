import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWristbandDto } from './dto/create-wristband.dto';
import { UpdateWristbandDto } from './dto/update-wristband.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wristband } from './entities/wristband.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WristbandsService {
  constructor(
    @InjectRepository(Wristband)
    private wristbandRepository: Repository<Wristband>,
  ) {}
  create(createWristbandDto: CreateWristbandDto) {
    return this.wristbandRepository.save(createWristbandDto);
  }

  findAll() {
    return this.wristbandRepository.find();
  }

  async findOne(id: number) {
    const wristband = await this.wristbandRepository.findOneBy({ id: id });
    if (!wristband) {
      throw new NotFoundException('Wristband not found');
    } else {
      return wristband;
    }
  }
  async update(id: number, updateWristbandDto: UpdateWristbandDto) {
    const wristband = await this.wristbandRepository.findOneBy({ id: id });
    if (!wristband) {
      throw new NotFoundException('Wristband not found');
    }
    return await this.wristbandRepository.save({
      ...wristband,
      ...updateWristbandDto,
    });
  }

  async remove(id: number) {
    const wristband = await this.wristbandRepository.findOneBy({ id: id });
    if (!wristband) {
      throw new NotFoundException('Wristband not found');
    }
    return this.wristbandRepository.softRemove(wristband);
  }
}
