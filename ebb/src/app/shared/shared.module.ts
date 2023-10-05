import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
