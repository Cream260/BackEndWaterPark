/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWristbandDto } from './dto/create-wristband.dto';
import { UpdateWristbandDto } from './dto/update-wristband.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wristband } from './entities/wristband.entity';
import { Repository } from 'typeorm';
import { Receipt } from '../receipts/entities/receipt.entity';

@Injectable()
export class WristbandsService {
  constructor(
    @InjectRepository(Wristband)
    private wristbandRepository: Repository<Wristband>,
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
  ) {}
  async create(createWristbandDto: CreateWristbandDto) {
    // const receipt = await this.receiptRepository.findOneBy({
    //   id: createWristbandDto.receiptId,
    // });
    // const wristband = new Wristband();
    // wristband.type = createWristbandDto.type;
    // wristband.startDate = createWristbandDto.startDate;
    // wristband.endDate = createWristbandDto.endDate;
    // wristband.receipt = receipt;
    return this.wristbandRepository.save(createWristbandDto);
  }

  findAll() {
    return this.wristbandRepository.find({
      relations: ['receipt'],
    });
  }

  async findOne(id: number) {
    const Order = await this.wristbandRepository.findOne({
      where: { id: id },
      relations: ['receipt'],
    });
    if (!Order) {
      throw new NotFoundException('WristbandDetail not found');
    } else {
      return Order;
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

  async createWristbandsFromReceipt(receipt: Receipt): Promise<void> {
    const { qty } = receipt;
    const wristbands = [];

    // ถ้ามี order ใน receipt
    if (receipt.order && receipt.order.length > 0) {
      // ลูปเพื่อสร้าง Wristband ตามจำนวนใน receipt.qty
      for (let i = 0; i < qty; i++) {
        const wristband = new Wristband();
        if (receipt.event != null) {
          wristband.type = 'Event';
        }
        if (receipt.package != null) {
          wristband.type = 'Package';
        }
        wristband.startDate = receipt.startDare;
        wristband.endDate = receipt.expDate;
        wristband.receipt = receipt;
        wristbands.push(wristband);
      }
    }
    // ถ้าไม่มี order ใน receipt
    else {
      // สร้าง wristband ตามจำนวนใน qty และให้กำหนด type ตามเงื่อนไข
      for (let i = 0; i < qty; i++) {
        const wristband = new Wristband();
        if (receipt.event != null) {
          wristband.type = 'Event';
        }
        if (receipt.package != null) {
          wristband.type = 'Package';
        }
        wristband.startDate = receipt.startDare;
        wristband.endDate = receipt.expDate;
        wristband.receipt = receipt;
        wristbands.push(wristband);
      }
    }

    // บันทึก Wristbands ลงในฐานข้อมูล
    await this.wristbandRepository.save(wristbands);
  }
}
