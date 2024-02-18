import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}
  create(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.save(createTicketDto);
  }

  findAll() {
    return this.ticketRepository.find();
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOneBy({ id: id });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    } else {
      return ticket;
    }
  }
  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.findOneBy({ id: id });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return await this.ticketRepository.save({
      ...ticket,
      ...updateTicketDto,
    });
  }
  async remove(id: number) {
    const ticket = await this.ticketRepository.findOneBy({ id: id });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return this.ticketRepository.softRemove(ticket);
  }
}
