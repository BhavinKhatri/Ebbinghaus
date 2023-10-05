import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoryListComponent } from './memory-list/memory-list.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => MemoryListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoryRoutingModule {}
