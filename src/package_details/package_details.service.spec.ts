import { Test, TestingModule } from '@nestjs/testing';
import { PackageDetailsService } from './package_details.service';

describe('PackageDetailsService', () => {
  let service: PackageDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageDetailsService],
    }).compile();

    service = module.get<PackageDetailsService>(PackageDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
