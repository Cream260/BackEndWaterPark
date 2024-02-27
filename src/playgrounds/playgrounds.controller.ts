import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaygroundsService } from './playgrounds.service';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { UpdatePlaygroundDto } from './dto/update-playground.dto';

@Controller('playgrounds')
export class PlaygroundsController {
  constructor(private readonly playgroundsService: PlaygroundsService) {}

  @Post()
  create(@Body() createPlaygroundDto: CreatePlaygroundDto) {
    return this.playgroundsService.create(createPlaygroundDto);
  }

  @Get()
  findAll() {
    return this.playgroundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playgroundsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaygroundDto: UpdatePlaygroundDto,
  ) {
    return this.playgroundsService.update(+id, updatePlaygroundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playgroundsService.remove(+id);
  }
}
