import { Test, TestingModule } from '@nestjs/testing';
import { WristbandDetailsService } from './wristband_details.service';

describe('WristbandDetailsService', () => {
  let service: WristbandDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WristbandDetailsService],
    }).compile();

    service = module.get<WristbandDetailsService>(WristbandDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
