/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  async create(createEventDto: CreateEventDto) {
    // const event = new Event();
    // const receipt = new Receipt();
    // event.name = createEventDto.name;
    // event.detail = createEventDto.detail;
    // event.price = createEventDto.price;
    // receipt.totalPrice = createEventDto.price;
    // receipt.netPrice = createEventDto.price;
    // const rec = await this.receiptRepository.save(receipt);
    // event.receipt = rec;
    return this.eventRepository.save(createEventDto);
  }

  findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOneBy({ id: id });
    if (!event) {
      throw new NotFoundException('Event not found');
    } else {
      return event;
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOneBy({ id: id });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return await this.eventRepository.save({
      ...event,
      ...updateEventDto,
    });
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneBy({ id: id });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return this.eventRepository.softRemove(event);
  }
}
