import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
export declare class TicketService {
    create(createTicketDto: CreateTicketDto): Ticket;
    findAll(): Ticket[];
    findOne(id: number): Ticket;
    update(id: number, updateTicketDto: UpdateTicketDto): Ticket;
    remove(id: number): Ticket;
    reset(): string;
}
