import { Controller, Get, Post } from '@nestjs/common';
import { EbbAppService } from './ebb-app.service';
import { IMemory } from './interfaces/IMemory';

@Controller()
export class EbbAppController {
  constructor(private readonly ebbAppService: EbbAppService) {}

  @Get()
  getHello(): string {
    const today = new Date();
    const utcDateForToday = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
    );
    const memory: IMemory = {
      createdAt: utcDateForToday,
      memory: 'I want to remember this.',
    };
    this.ebbAppService.create(memory);
    return this.ebbAppService.getHello();
  }

  @Get()
  revisionForToday() {
    return this.ebbAppService.getMemories();
  }

  @Post()
  revisionCompleted(memoryId: string) {
    this.ebbAppService.revisionComplete(memoryId);
  }
}
