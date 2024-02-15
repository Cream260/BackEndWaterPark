"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
let events = [
    { id: 1, name: 'Training Center', detail: 'swimtraining', price: 500 }
];
let lastEventId = 2;
let EventService = class EventService {
    create(createEventDto) {
        console.log({ ...createEventDto });
        const newEvent = {
            id: lastEventId++,
            ...createEventDto,
        };
        events.push(newEvent);
        return newEvent;
    }
    findAll() {
        return events;
    }
    findOne(id) {
        const index = events.findIndex((event) => {
            return event.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        return events[index];
    }
    update(id, updateEventDto) {
        const index = events.findIndex((event) => {
            return event.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        console.log('event ' + JSON.stringify(events[index]));
        console.log('update ' + JSON.stringify(updateEventDto));
        const updateEvent = {
            ...events[index],
            ...updateEventDto,
        };
        events[index] = updateEvent;
        return updateEvent;
    }
    remove(id) {
        const index = events.findIndex((event) => {
            return event.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        const deleteEvent = events[index];
        events.splice(index, 1);
        return deleteEvent;
    }
    reset() {
        events = [
            { id: 1, name: 'Training Center', detail: 'swimtraining', price: 500 }
        ];
        lastEventId = 2;
        return 'RESET';
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)()
], EventService);
//# sourceMappingURL=event.service.js.map