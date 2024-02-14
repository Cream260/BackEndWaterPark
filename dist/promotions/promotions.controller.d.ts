import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
export declare class PromotionsController {
    private readonly promotionsService;
    constructor(promotionsService: PromotionsService);
    create(createPromotionDto: CreatePromotionDto): import("./entities/promotion.entity").Promotion;
    findAll(): import("./entities/promotion.entity").Promotion[];
    findOne(id: string): import("./entities/promotion.entity").Promotion;
    update(id: string, updatePromotionDto: UpdatePromotionDto): import("./entities/promotion.entity").Promotion;
    remove(id: string): import("./entities/promotion.entity").Promotion;
}
