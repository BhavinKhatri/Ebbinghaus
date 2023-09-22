import { Test, TestingModule } from '@nestjs/testing';
import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateService],
    }).compile();

    service = module.get<DateService>(DateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should skip number of days and return true or false', () => {
    const mutatingToday = new Date();
    const twoDaysBeforeToday = new Date(
      mutatingToday.setDate(mutatingToday.getDate() - 2),
    );
    const ms = Date.UTC(
      twoDaysBeforeToday.getFullYear(),
      twoDaysBeforeToday.getMonth(),
      twoDaysBeforeToday.getDate(),
    );
    const isSame = service.isSameDateAfterSkip(ms, 1);
    expect(isSame).toBeTruthy();
  });
});
