/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from './entities/receipt.entity';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private ReceiptRepository: Repository<Receipt>,
  ) {}
  create(createReceiptDto: CreateReceiptDto) {
    return this.ReceiptRepository.save(createReceiptDto);
  }

  findAll() {
    return this.ReceiptRepository.find();
  }

  async findOne(id: number) {
    const Receipt = await this.ReceiptRepository.findOneBy({ id: id });
    if (!Receipt) {
      throw new NotFoundException('Receipt not found');
    } else {
      return Receipt;
    }
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    const Receipt = await this.ReceiptRepository.findOneBy({ id: id });
    if (!Receipt) {
      throw new NotFoundException('Receipt not found');
    }
    return await this.ReceiptRepository.save({
      ...Receipt,
      ...updateReceiptDto,
    });
  }

  async remove(id: number) {
    const Receipt = await this.ReceiptRepository.findOneBy({ id: id });
    if (!Receipt) {
      throw new NotFoundException('Receipt not found');
    }
    return this.ReceiptRepository.softRemove(Receipt);
  }
}
