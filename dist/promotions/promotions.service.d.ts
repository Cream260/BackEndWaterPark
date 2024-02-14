import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
export declare class PromotionsService {
    create(createPromotionDto: CreatePromotionDto): Promotion;
    findAll(): Promotion[];
    findOne(id: number): Promotion;
    update(id: number, updatePromotionDto: UpdatePromotionDto): Promotion;
    remove(id: number): Promotion;
}
