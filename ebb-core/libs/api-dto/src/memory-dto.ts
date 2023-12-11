export interface MemoryPostRequest {
  memory: string;
}

export interface MemoryPostResponse {
  memory: string;
}

export interface CompleteMemoryPostRequest {
  memory: string;
  memoryId: string;
}

export interface CompleteMemoryPostResponse {
  isSuccess: boolean;
}
