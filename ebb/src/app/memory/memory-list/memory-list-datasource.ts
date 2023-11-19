import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MemoriesDto } from '@rectrix/ebb-api-dto';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';

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
  ): Observable<MemoriesDto<string>> {
    const href = `${Environment.APP_URL}/memory/all`;

    return this._httpClient.get<MemoriesDto<string>>(href);
  }
}
