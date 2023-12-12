import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CompleteMemoryPostRequest,
  CompleteMemoryPostResponse,
} from '@rectrix/ebb-api-dto';
import { IStatefulMemory } from '@rectrix/ebb-api-dto/src/core';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditMemoryService {
  constructor(private httpClient: HttpClient) {}
  editMemory(memory: string, memoryId: string) {
    const mpr: CompleteMemoryPostRequest = {
      memory: memory,
      memoryId: memoryId,
    };
    return this.httpClient.post<CompleteMemoryPostResponse>(
      `${Environment.APP_URL}/memory/complete`,
      mpr
    );
  }

  getMemoryById(memoryId: string) {
    return this.httpClient.get<IStatefulMemory<string>>(
      `${Environment.APP_URL}/memory/${memoryId}`
    );
  }
}
