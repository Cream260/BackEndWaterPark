"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsService = void 0;
const common_1 = require("@nestjs/common");
const promotions = [
    {
        id: 1,
        name: 'มา2จ่าย1',
        code: 'Promo123',
        detail: 'ลูกค้าที่ซื้อบัตรเข้าสวนน้ำ 2 ใบจะจ่ายเพียงราคาของบัตรเข้าสวนน้ำ 1 ใบเท่านั้นเพียงแค่กรอกโค้ด',
        startDate: new Date(),
        endDate: new Date(),
        discount: 20,
    },
];
let lastPromoId = 2;
let PromotionsService = class PromotionsService {
    create(createPromotionDto) {
        const newPromo = {
            id: lastPromoId++,
            ...createPromotionDto,
        };
        promotions.push(newPromo);
        return newPromo;
    }
    findAll() {
        return promotions;
    }
    findOne(id) {
        const index = promotions.findIndex((promotion) => {
            return promotion.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        return promotions[index];
    }
    update(id, updatePromotionDto) {
        const index = promotions.findIndex((promotion) => {
            return promotion.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        const updatePromotion = {
            ...promotions[index],
            ...updatePromotionDto,
        };
        promotions[index] = updatePromotion;
        return updatePromotion;
    }
    remove(id) {
        const index = promotions.findIndex((promotion) => {
            return promotion.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        const deletePromotion = promotions[index];
        promotions.splice(index, 1);
        return deletePromotion;
    }
};
exports.PromotionsService = PromotionsService;
exports.PromotionsService = PromotionsService = __decorate([
    (0, common_1.Injectable)()
], PromotionsService);
//# sourceMappingURL=promotions.service.js.map