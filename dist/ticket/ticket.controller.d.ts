import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    create(createTicketDto: CreateTicketDto): import("./entities/ticket.entity").Ticket;
    findAll(): import("./entities/ticket.entity").Ticket[];
    reset(): string;
    findOne(id: string): import("./entities/ticket.entity").Ticket;
    update(id: string, updateTicketDto: UpdateTicketDto): import("./entities/ticket.entity").Ticket;
    remove(id: string): import("./entities/ticket.entity").Ticket;
}
