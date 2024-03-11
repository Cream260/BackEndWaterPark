import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Get(':id/qr')
  async generateQrCode(@Param('id') id: string): Promise<string> {
    const link = `http://127.0.0.1:5173/CheckRequire/${id}`;
    return await this.ordersService.generateQrCodeForOrder(link);
  }

  @Get(':id/event')
  findEventByOrder(@Param('id') id: string) {
    return this.ordersService.findEventByOrder(+id);
  }

  @Get(':id/package')
  findPackageByOrder(@Param('id') id: string) {
    return this.ordersService.findPackageByOrder(+id);
  }

  @Get(':id/promotion')
  findPromotionByOrder(@Param('id') id: string) {
    return this.ordersService.findPromotionByOrder(+id);
  }
}
