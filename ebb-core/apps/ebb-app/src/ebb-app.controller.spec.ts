import { Test, TestingModule } from '@nestjs/testing';
import { EbbAppController } from './ebb-app.controller';
import { EbbAppService } from './ebb-app.service';
import { IMemory } from './interfaces/IMemory';
import { PersistentMemory } from './classes/PersistentMemory';
import { IPaceRepeatedAlgorithm } from './interfaces/IPaceRepeatedAlgorithm';
import { EbbinghausAlgorithm } from './classes/EbbinghausAlgorithm';
import { DateService } from './utils/date/date.service';

const dateServiceMock = jest
  .spyOn(DateService.prototype, 'isSameDateAfterSkip')
  .mockImplementation((_: number, skipCount: number) => {
    switch (skipCount) {
      case 0:
      case 1:
      case 2:
      case 5:
      case 8:
      case 13:
      case 21:
        return true;
    }
    return false;
  });
describe('EbbAppController', () => {
  let ebbAppController: EbbAppController;
  let pra: IPaceRepeatedAlgorithm;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EbbAppController],
      providers: [
        DateService,
        {
          provide: IPaceRepeatedAlgorithm,
          useClass: EbbinghausAlgorithm,
        },
        EbbAppService,
      ],
    }).compile();

    ebbAppController = app.get<EbbAppController>(EbbAppController);
    pra = app.get<IPaceRepeatedAlgorithm>(IPaceRepeatedAlgorithm);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ebbAppController.getHello()).toBe('Hello World!');
    });

    it('should get the revision on 2nd day after creation"', () => {
      const memory: IMemory<string> = {
        createdAt: 0,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 0;
      const revision = pra.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });

    it('should get the revision on 3rd day after creation"', () => {
      const memory: IMemory<string> = {
        createdAt: 0,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 1;
      const revision = pra.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });

    it('should get the revision on 5th day after creation"', () => {
      const memory: IMemory<string> = {
        createdAt: 0,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 2;
      const revision = pra.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });

    it('should get the revision on 13th day after creation"', () => {
      const memory: IMemory<string> = {
        createdAt: 0,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 3;
      const revision = pra.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });

    it('should get the revision on 21th day after creation"', () => {
      const memory: IMemory<string> = {
        createdAt: 0,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 4;
      const revision = pra.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });
  });
});
