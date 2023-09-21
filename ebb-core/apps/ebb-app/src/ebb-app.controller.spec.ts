import { Test, TestingModule } from '@nestjs/testing';
import { EbbAppController } from './ebb-app.controller';
import { EbbAppService } from './ebb-app.service';
import { IMemory } from './interfaces/IMemory';
import { PersistentMemory } from './classes/PersistentMemory';
import { EbbinghausAlgorithm } from './classes/EbbinghausAlgorithm';

describe('EbbAppController', () => {
  let ebbAppController: EbbAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EbbAppController],
      providers: [EbbAppService],
    }).compile();

    ebbAppController = app.get<EbbAppController>(EbbAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ebbAppController.getHello()).toBe('Hello World!');
    });

    // it('should create a memory"', () => {
    //   ebbAppController.getHello();
    //   ebbAppController.revisionCompleted('1');
    //   const m = ebbAppController.revisionForToday();
    //   console.log(m);
    //   expect(m.length).toBe(1);
    // });

    it('should get the revision on 3rd day after creation"', () => {
      const eb = new EbbinghausAlgorithm();
      const createdDate = new Date(2023, 8, 19);
      console.log('date utc month');
      console.log(createdDate.getUTCMonth());
      const utcDateForToday = Date.UTC(
        createdDate.getUTCFullYear(),
        createdDate.getUTCMonth(),
        createdDate.getUTCDate(),
      );
      const memory: IMemory = {
        createdAt: utcDateForToday,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 2;
      const revision = eb.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });

    it('should get the revision on 5th day after creation"', () => {
      const eb = new EbbinghausAlgorithm();
      const memory: IMemory = {
        createdAt: 1694736000000,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 3;
      const revision = eb.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });

    it('should get the revision on 8th day after creation"', () => {
      const eb = new EbbinghausAlgorithm();
      const memory: IMemory = {
        createdAt: 1694476800000,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 4;
      const revision = eb.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });

    it('should get the revision on 13th day after creation"', () => {
      const eb = new EbbinghausAlgorithm();
      const memory: IMemory = {
        createdAt: 1694044800000,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 5;
      const revision = eb.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });

    it('should get the revision on 21th day after creation"', () => {
      const eb = new EbbinghausAlgorithm();
      const memory: IMemory = {
        createdAt: 1693353600000,
        memory: 'I want to remember this.',
      };
      const pm = new PersistentMemory(memory);
      pm.revisionCounts = 6;
      const revision = eb.getMemoriesForRepeatation([pm]);
      const numberOfRevisions = revision.length;
      expect(numberOfRevisions).toBe(1);
    });
  });
});
