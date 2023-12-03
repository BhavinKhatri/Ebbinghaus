import { Injectable } from '@nestjs/common';
import * as utc from 'dayjs/plugin/utc';
import * as dayjs from 'dayjs';
dayjs.extend(utc);
@Injectable()
export class DateService {
  get todayAsUTC(): Date {
    return dayjs.utc().toDate();
  }

  isSameDateAfterSkip(utcDateMiliseconds: number, skipCount: number) {
    const utcCreatedDate = dayjs(new Date(utcDateMiliseconds));
    const utcDateAfterSkip = utcCreatedDate.add(skipCount + 1, 'day');
    const todayAsUtc = dayjs.utc();
    return todayAsUtc.isSame(utcDateAfterSkip, 'day');
  }

  isDateBeforeTheSkippedDay(utcDateMiliseconds: number, skipCount: number) {
    const utcCreatedDate = dayjs(new Date(utcDateMiliseconds));
    const utcDateAfterSkip = utcCreatedDate.add(skipCount + 1, 'day');
    const todayAsUtc = dayjs.utc();
    return todayAsUtc.isAfter(utcDateAfterSkip, 'day');
  }
}
