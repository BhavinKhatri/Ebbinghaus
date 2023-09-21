import { Controller, Get } from '@nestjs/common';
import { EbbAppService } from './ebb-app.service';

@Controller()
export class EbbAppController {
  constructor(private readonly ebbAppService: EbbAppService) {}

  @Get()
  getHello(): string {
    return this.ebbAppService.getHello();
  }
}
