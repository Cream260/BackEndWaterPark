import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    create(createEventDto: CreateEventDto): import("./entities/event.entity").Event;
    findAll(): import("./entities/event.entity").Event[];
    reset(): string;
    findOne(id: string): import("./entities/event.entity").Event;
    update(id: string, updateEventDto: UpdateEventDto): import("./entities/event.entity").Event;
    remove(id: string): import("./entities/event.entity").Event;
}
