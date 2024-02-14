import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {Event} from './entities/event.entity';

let events:Event[] = [
  {id: 1, name: 'Training Center', detail:'swimtraining', price:500}
];
let lastEventId = 2;
@Injectable()
export class EventService {
  create(createEventDto: CreateEventDto) {

    console.log({...createEventDto});
    const newEvent: Event ={
      id: lastEventId++,
      ...createEventDto,// name, detail, price
    };
    events.push(newEvent);
    return newEvent;
  }

  findAll() {
    return events;
  }

  findOne(id: number) {
    const index = events.findIndex((event)=> {
      return event.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    return events[index];
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    const index = events.findIndex((event)=> {
      return event.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    console.log('event '+ JSON.stringify(events[index]));
    console.log('update '+ JSON.stringify(updateEventDto));
    const updateEvent:Event = {
      ...events[index],
      ...updateEventDto,
    };
    events[index] = updateEvent;
    return updateEvent;
  }

  remove(id: number) {
    const index = events.findIndex((event)=> {
      return event.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    const deleteEvent = events[index];
    events.splice(index, 1);
    return deleteEvent;
  }
  reset(){
    events = [
      {id: 1, name: 'Training Center', detail:'swimtraining', price:500}
    ];
    lastEventId = 2;
    return 'RESET';
  }
}
