import { IPaceRepeatedAlgorithm } from '../interfaces/IPaceRepeatedAlgorithm';
import { IPaceRepeatedMemory } from '@ebb/api-dto/core';
import { DateService } from '../utils/date/date.service';
import { Injectable } from '@nestjs/common';

@Injectable()
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
  constructor(private dateService: DateService) {}
  private paceSequenceInDays = [-1, 0, 1, 2, 5, 8, 13, 21];
  getMemoriesForRepeatation(memories: IPaceRepeatedMemory[]) {
    return memories.filter((m) => {
      if (this.paceSequenceInDays.length > m.revisionCounts) {
        const daysToSkipFromCreatedDate =
          this.paceSequenceInDays[m.revisionCounts];
        const isSameDay = this.dateService.isSameDateAfterSkip(
          m.createdAt,
          daysToSkipFromCreatedDate,
        );
        const isTodayAfterSkippedDate =
          this.dateService.isDateBeforeTheSkippedDay(
            m.createdAt,
            daysToSkipFromCreatedDate,
          );
        return isSameDay || isTodayAfterSkippedDate;
      }
      return false;
    });
  }
}
