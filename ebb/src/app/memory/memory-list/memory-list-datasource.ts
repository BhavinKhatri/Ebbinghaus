import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { IStatefulMemory } from './api';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';

// TODO: Replace this with your own data model type
export interface MemoryListItem {
  name: string;
  id: number;
}

/**
 * Data source for the MemoryList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MemoryListDataSource {
  constructor(private _httpClient: HttpClient) {}
  getMemories(
    sort?: string,
    order?: SortDirection,
    page?: number
  ): Observable<{ memories: IStatefulMemory<string>[] }> {
    const href = `${Environment.APP_URL}/memory/all`;

    return this._httpClient.get<{ memories: IStatefulMemory<string>[] }>(href);
  }
}
