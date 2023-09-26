import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { EbbAppService } from './ebb-app.service';
import { IMemory } from './interfaces/IMemory';
import { AuthGuard } from './auth/auth.guard';

@Controller('memory')
export class EbbAppController {
  constructor(private readonly ebbAppService: EbbAppService<string>) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createMemory(@Request() req): string {
    const today = new Date();
    const utcDateForToday = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
    );
    const memory: IMemory<string> = {
      createdAt: utcDateForToday,
      memory: 'I want to remember this.',
    };
    this.ebbAppService.create(memory, req.userId);
    return 'Hi';
  }

  @UseGuards(AuthGuard)
  @Get('revision-today')
  revisionForToday(@Request() req) {
    return this.ebbAppService.getMemories(req.userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  revisionCompleted(memoryId: string) {
    this.ebbAppService.revisionComplete(memoryId);
  }
}
