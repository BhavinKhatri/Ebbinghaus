import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { EbbAppService } from './ebb-app.service';
import {
  MemoriesDto,
  MemoryPostRequest,
  MemoryPostResponse,
} from 'libs/api-dto';
import { IMemory } from '@ebb/api-dto/core';
import { AuthGuard } from './auth/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('memory')
export class EbbAppController {
  constructor(private readonly ebbAppService: EbbAppService<string>) {}

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Gets a list of memories',
  })
  getAllMemories(@Request() req: { userId: string }) {
    const allMemories = this.ebbAppService.getMemories(req.userId);
    return new MemoriesDto(allMemories);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create note',
    requestBody: {
      $ref: 'MemoryPostDto',
    },
  })
  @Post('create')
  createMemory(@Body() req: MemoryPostRequest): MemoryPostResponse {
    const today = new Date();
    const utcDateForToday = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
    );
    const memory: IMemory<string> = {
      createdAt: utcDateForToday,
      memory: req.memory,
    };
    this.ebbAppService.create(memory, req.userId);
    return req;
  }

  @UseGuards(AuthGuard)
  @Get('revision-today')
  revisionForToday(@Request() req) {
    return this.ebbAppService.getMemories(req.userId);
  }

  @UseGuards(AuthGuard)
  @Post('complete')
  revisionCompleted(memoryId: string) {
    this.ebbAppService.revisionComplete(memoryId);
  }
}
