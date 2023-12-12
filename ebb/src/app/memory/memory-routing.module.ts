import { NgModule, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoryListComponent } from './memory-list/memory-list.component';
import { AuthGuard } from '../auth.guard';
import { AddMemoryComponent } from './add-memory/add-memory.component';
import { LocalStorageService } from '../local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { EditMemoryComponent } from './edit-momory/edit-memory.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => MemoryListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    loadComponent: () => AddMemoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () => EditMemoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryRoutingModule {
  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.isBrowser.set(
      isPlatformBrowser(inject(PLATFORM_ID))
    );
  }
}
