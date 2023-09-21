import { Test, TestingModule } from '@nestjs/testing';
import { EbbAppController } from './ebb-app.controller';
import { EbbAppService } from './ebb-app.service';

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
  });
});
