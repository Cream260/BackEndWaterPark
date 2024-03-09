/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: ['customer', 'employee'],
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    } else {
      throw new HttpException('Invalid password.', HttpStatus.UNAUTHORIZED);
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const createUser = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });
      console.log(createUser);

      if (createUser !== null) {
        return new HttpException(
          'username already in use.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const createUser_ = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      console.log(createUser_);

      if (createUser_ != null) {
        return new HttpException(
          'email already in use.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/; //มีตัวพิมพ์ใหญ่ พิมพ์เล็ก อักษรพิเศษ และมี 8-20 ตัว
      if (!passwordRegex.test(createUserDto.password)) {
        throw new HttpException(
          'password does not meet requirements Please try again.',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(createUserDto);

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const cteUser = this.userRepository.create({
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
        name: createUserDto.name,
        tel: createUserDto.tel,
        role: 'customer',
      });

      const user_ = await this.userRepository.save(cteUser); //save user

      const customer = this.customerRepository.create({
        email: user_.email,
        name: user_.name,
        tel: user_.tel,
        user: user_,
      });

      const customer_ = await this.customerRepository.save(customer); //save customer
      user_.customer = customer_;
      await this.userRepository.save(user_);

      return this.userRepository.findOne({
        where: { username: user_.username },
        relations: ['customer'],
      });
    } catch (err) {
      console.error(err);
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
