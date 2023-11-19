import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemoryPostRequest, MemoryPostResponse } from '@rectrix/ebb-api-dto';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddMemoryService {
  constructor(private httpClient: HttpClient) {}
  addMemory(memory: string) {
    const mpr: MemoryPostRequest = {
      memory: memory,
      userId: '',
    };
    return this.httpClient.post<MemoryPostResponse>(
      `${Environment.APP_URL}/memory/create`,
      mpr
    );
  }
}
