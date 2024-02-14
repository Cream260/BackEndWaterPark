import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';


let tickets:Ticket[] = [
  {id: 1, name: 'ตั๋วเด็ก', detail:'เด็กที่มีอายุ 10-12ปี', price:159, type: 'ไทย'}
];
let lastTicketId = 2;
@Injectable()
export class TicketService {
  create(createTicketDto: CreateTicketDto) {

    console.log({...createTicketDto});
    const newTicket: Ticket ={
      id: lastTicketId++,
      ...createTicketDto,
    };
    tickets.push(newTicket);
    return newTicket;
  }

  findAll() {
    return tickets;
  }

  findOne(id: number) {
    const index = tickets.findIndex((ticket)=> {
      return ticket.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    return tickets[index];
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    const index = tickets.findIndex((ticket)=> {
      return ticket.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    console.log('ticket '+ JSON.stringify(tickets[index]));
    console.log('update '+ JSON.stringify(updateTicketDto));
    const updateTicket: Ticket = {
      ...tickets[index],
      ...updateTicketDto,
    };
    tickets[index] = updateTicket;
    return updateTicket;
  }

  remove(id: number) {
    const index = tickets.findIndex((ticket)=> {
      return ticket.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    const deleteTicket = tickets[index];
    tickets.splice(index, 1);
    return deleteTicket;
  }
  reset(){
    tickets = [
      {id: 1, name: 'ตั๋วเด็ก', detail:'เด็กที่มีอายุ 10-12ปี', price:159, type: 'ไทย'}
    ];
    lastTicketId = 2;
    return 'RESET';
  }
}
