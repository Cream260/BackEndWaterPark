import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WristbandsService } from './wristbands.service';
import { CreateWristbandDto } from './dto/create-wristband.dto';
import { UpdateWristbandDto } from './dto/update-wristband.dto';

@Controller('wristbands')
export class WristbandsController {
  constructor(private readonly wristbandsService: WristbandsService) {}

  @Post()
  create(@Body() createWristbandDto: CreateWristbandDto) {
    return this.wristbandsService.create(createWristbandDto);
  }

  @Get()
  findAll() {
    return this.wristbandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wristbandsService.findOne(+id);
  }

  @Get(':id')
  findOrderByWristband(@Param('id') id: string) {
    return this.wristbandsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWristbandDto: UpdateWristbandDto,
  ) {
    return this.wristbandsService.update(+id, updateWristbandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wristbandsService.remove(+id);
  }

  // @Get(':id/qr')
  // async generateQrCode(@Param('id') id: string): Promise<string> {
  //   const link = `http://127.0.0.1:5173/CheckRequire/${id}`;
  //   return await this.wristbandsService.generateQrCodeForWristBand(link);
  // }
}
