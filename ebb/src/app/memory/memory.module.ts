import { NgModule } from '@angular/core';

import { MemoryRoutingModule } from './memory-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    MemoryRoutingModule
  ]
})
export class MemoryModule { }
