import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
export declare class EventService {
    create(createEventDto: CreateEventDto): Event;
    findAll(): Event[];
    findOne(id: number): Event;
    update(id: number, updateEventDto: UpdateEventDto): Event;
    remove(id: number): Event;
    reset(): string;
}
