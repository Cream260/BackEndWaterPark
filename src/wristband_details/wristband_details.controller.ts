import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WristbandDetailsService } from './wristband_details.service';
import { CreateWristbandDetailDto } from './dto/create-wristband_detail.dto';
import { UpdateWristbandDetailDto } from './dto/update-wristband_detail.dto';

@Controller('wristband-details')
export class WristbandDetailsController {
  constructor(
    private readonly wristbandDetailsService: WristbandDetailsService,
  ) {}

  @Post()
  create(@Body() createWristbandDetailDto: CreateWristbandDetailDto) {
    return this.wristbandDetailsService.create(createWristbandDetailDto);
  }

  @Get()
  findAll() {
    return this.wristbandDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wristbandDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWristbandDetailDto: UpdateWristbandDetailDto,
  ) {
    return this.wristbandDetailsService.update(+id, updateWristbandDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wristbandDetailsService.remove(+id);
  }
}
