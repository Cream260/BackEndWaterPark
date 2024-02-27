/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { UpdatePlaygroundDto } from './dto/update-playground.dto';
import { Playground } from './entities/playground.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaygroundsService {
  constructor(
    @InjectRepository(Playground)
    private playRepository: Repository<Playground>,
  ) {}
  create(createPlaygroundDto: CreatePlaygroundDto) {
    return this.playRepository.save(createPlaygroundDto);
  }

  findAll() {
    return this.playRepository.find();
  }

  async findOne(id: number) {
    const playground = await this.playRepository.findOneBy({ id: id });
    if (!playground) {
      throw new NotFoundException('playground not found');
    } else {
      return playground;
    }
  }

  async update(id: number, updatePlaygroundDto: UpdatePlaygroundDto) {
    const playground = await this.playRepository.findOneBy({ id: id });
    if (!playground) {
      throw new NotFoundException('playground not found');
    }
    return await this.playRepository.save({
      ...playground,
      ...updatePlaygroundDto,
    });
  }

  async remove(id: number) {
    const playground = await this.playRepository.findOneBy({ id: id });
    if (!playground) {
      throw new NotFoundException('playground not found');
    }
    return this.playRepository.softRemove(playground);
  }
}
