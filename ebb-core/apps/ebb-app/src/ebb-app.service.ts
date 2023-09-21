import { Injectable } from '@nestjs/common';

@Injectable()
export class EbbAppService {
  memories = [];
  getHello(): string {
    return 'Hello World!';
  }
  create(memory: string) {
    this.memories.push(memory);
  }
}
