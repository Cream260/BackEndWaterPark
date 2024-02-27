import { Test, TestingModule } from '@nestjs/testing';
import { WristbandDetailsController } from './wristband_details.controller';
import { WristbandDetailsService } from './wristband_details.service';

describe('WristbandDetailsController', () => {
  let controller: WristbandDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WristbandDetailsController],
      providers: [WristbandDetailsService],
    }).compile();

    controller = module.get<WristbandDetailsController>(
      WristbandDetailsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
