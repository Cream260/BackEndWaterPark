import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authsService.register(createUserDto);
  }

  @Get()
  findAll() {
    return this.authsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authsService.remove(+id);
  }
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authsService.validateUser(
      createUserDto.username,
      createUserDto.password,
    );
  }
}
