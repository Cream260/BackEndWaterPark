"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
let tickets = [
    { id: 1, name: 'ตั๋วเด็ก', detail: 'เด็กที่มีอายุ 10-12ปี', price: 159, type: 'ไทย' }
];
let lastTicketId = 2;
let TicketService = class TicketService {
    create(createTicketDto) {
        console.log({ ...createTicketDto });
        const newTicket = {
            id: lastTicketId++,
            ...createTicketDto,
        };
        tickets.push(newTicket);
        return newTicket;
    }
    findAll() {
        return tickets;
    }
    findOne(id) {
        const index = tickets.findIndex((ticket) => {
            return ticket.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        return tickets[index];
    }
    update(id, updateTicketDto) {
        const index = tickets.findIndex((ticket) => {
            return ticket.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        console.log('ticket ' + JSON.stringify(tickets[index]));
        console.log('update ' + JSON.stringify(updateTicketDto));
        const updateTicket = {
            ...tickets[index],
            ...updateTicketDto,
        };
        tickets[index] = updateTicket;
        return updateTicket;
    }
    remove(id) {
        const index = tickets.findIndex((ticket) => {
            return ticket.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        const deleteTicket = tickets[index];
        tickets.splice(index, 1);
        return deleteTicket;
    }
    reset() {
        tickets = [
            { id: 1, name: 'ตั๋วเด็ก', detail: 'เด็กที่มีอายุ 10-12ปี', price: 159, type: 'ไทย' }
        ];
        lastTicketId = 2;
        return 'RESET';
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)()
], TicketService);
//# sourceMappingURL=ticket.service.js.map