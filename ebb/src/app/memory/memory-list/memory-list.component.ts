import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MemoryListDataSource } from './memory-list-datasource';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  catchError,
  map,
  mergeWith,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MemoryDto } from '@rectrix/ebb-api-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class MemoryListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MemoryDto<string>>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['number', 'title', 'actions'];
  data: MemoryDto<string>[] = [];
  resultsLength = 0;
  isLoadingResults!: boolean;
  memoryListDataSource!: MemoryListDataSource;
  constructor(
    private _httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoadingResults = true;
  }

  ngAfterViewInit(): void {
    this.memoryListDataSource = new MemoryListDataSource(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.sort.sortChange
      .pipe(
        mergeWith(this.paginator.page),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.memoryListDataSource.getMemories(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(
            catchError((e) => {
              console.log(e);
              return of(null);
            })
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.memories.length;
          return data.memories;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  addData() {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
    });
  }

  deleteRow(row: string) {
    console.log(row);
  }

  editRow(row:string) {
    console.log(row);
  }
}
