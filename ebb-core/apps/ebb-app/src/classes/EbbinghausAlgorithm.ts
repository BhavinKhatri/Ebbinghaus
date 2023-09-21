import { IPaceRepeatedAlgorithm } from '../interfaces/IPaceRepeatedAlgorithm';
import { PersistentMemory } from './PersistentMemory';
import * as utc from 'dayjs/plugin/utc';
import * as dayjs from 'dayjs';
import { IPaceRepeatedMemory } from '../interfaces/IMemory';
dayjs.extend(utc);

export class EbbinghausAlgorithm implements IPaceRepeatedAlgorithm {
  /// revision counts
  /// 0 - Day of starting 18
  /// 1 - 2nd day of the starting Total - 1 after starting 19
  /// 2 - Skip 1 days after previous day - Total 2 days after 21
  /// 3 - Skip 2 days after previous day - Total 5 days after starting days.
  /// 4 - Skip 3 days after previous day - Total 8 days after starting days.
  /// 5 - Skip 5 days after previous day - Total 13 days after starting days
  /// 6 - Skip 8 days after previous day, Total 21 days after starting days
  /// 7 - Skip 13 days after previous day Total - days after starting days
  private paceSequenceInDays = [0, 1, 2, 5, 8, 13, 21];
  getMemoriesForRepeatation(memories: IPaceRepeatedMemory[]) {
    return memories.filter((m) => {
      if (this.paceSequenceInDays.length > m.revisionCounts) {
        const daysToSkipFromCreatedDate =
          this.paceSequenceInDays[m.revisionCounts];
        const utcCreatedDate = dayjs(new Date(m.createdAt));
        console.log('utcCreatedDate');
        console.log(utcCreatedDate);
        const utcDateAfterSkip = utcCreatedDate.add(
          daysToSkipFromCreatedDate + 1,
          'day',
        );
        const todayAsUtc = dayjs.utc();
        console.log('todayAsUtc');
        console.log(todayAsUtc);
        console.log('utcDateAfterSkip');
        console.log(utcDateAfterSkip);
        const isSameDay = todayAsUtc.isSame(utcDateAfterSkip, 'day');
        console.log('isSameDay');
        console.log(isSameDay);
        return isSameDay;
      }
      return false;
    });
  }
}
