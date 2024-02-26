/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWristbandDto } from './dto/create-wristband.dto';
import { UpdateWristbandDto } from './dto/update-wristband.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wristband } from './entities/wristband.entity';
import { Repository } from 'typeorm';
import { Receipt } from '../receipts/entities/receipt.entity';
import { Playground } from '../playgrounds/entities/playground.entity';
import { WristbandDetail } from '../wristband_details/entities/wristband_detail.entity';
import { Review } from '../reviews/entities/review.entity';

@Injectable()
export class WristbandsService {
  constructor(
    @InjectRepository(Wristband)
    private wristbandRepository: Repository<Wristband>,
    @InjectRepository(WristbandDetail)
    private wristbandDtRepository: Repository<WristbandDetail>,
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
    @InjectRepository(Playground)
    private playgroundRepository: Repository<Playground>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}
  async create(createWristbandDto: CreateWristbandDto) {
    const receipt = await this.receiptRepository.findOne({
      where: { id: createWristbandDto.receiptId },
      relations: [
        'event',
        'package',
        'package.package_detail',
        'order',
        'order.ticket',
      ], // ดึงข้อมูลมาจาก receipt
    });

    const wristband = new Wristband();
    // if (receipt.event != null) {
    //   wristband.type = 'Event';
    // }
    // if (receipt.package != null) {
    //   wristband.type = receipt.package.package_detail[receipt.package.id].name;
    // }
    // if (receipt.order) {
    //   wristband.type = receipt.order[receipt.id].ticket.type;
    // }
    // console.log(
    //   'package',
    //   receipt.package.package_detail[receipt.package.id].type,
    // );
    // console.log('order', receipt.order[receipt.id].ticket.type);
    // console.log('Type', wristband.type);
    wristband.type = createWristbandDto.type;
    wristband.startDate = receipt.startDare;
    wristband.endDate = receipt.expDate;
    wristband.receipt = receipt;

    await this.wristbandRepository.save(wristband);

    for (const detail of createWristbandDto.wristband_detail) {
      const playground = await this.playgroundRepository.findOne({
        where: { name: detail.namePlay },
        relations: ['wristband_detail'],
      });
      if (playground) {
        // console.log('found ticket');
        const wristband_detail = new WristbandDetail();
        wristband_detail.namePlay = detail.namePlay;
        wristband_detail.sum = detail.sum;
        wristband_detail.wristband = wristband;
        wristband_detail.playground = playground;

        await this.wristbandDtRepository.save(wristband_detail);
      }
    }
    await this.wristbandRepository.save(wristband);

    for (const re of createWristbandDto.review) {
      const playground = await this.playgroundRepository.findOne({
        where: { name: re.name },
        relations: ['review'],
      });
      if (playground) {
        // console.log('found ticket');
        const review = new Review();
        review.name = re.name;
        review.rate = re.rate;
        review.text = re.text;
        review.wristband = wristband;
        review.playground = playground;
        await this.reviewRepository.save(review);
      }
    }

    await this.wristbandRepository.save(wristband);
    return await this.wristbandRepository.findOne({
      where: { id: wristband.id },
      relations: ['wristband_detail', 'review'],
    });
  }

  findAll() {
    return this.wristbandRepository.find({
      relations: [
        'receipt',
        'wristband_detail',
        'wristband_detail.playground',
        'review',
        'review.playground',
      ],
    });
  }

  async findOne(id: number) {
    const Order = await this.wristbandRepository.findOne({
      where: { id: id },
      relations: [
        'receipt',
        'wristband_detail',
        'wristband_detail.playground',
        'review',
        'review.playground',
      ],
    });
    if (!Order) {
      throw new NotFoundException('Wristband not found');
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
