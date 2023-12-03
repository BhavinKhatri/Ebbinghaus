import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AddMemoryService } from './add-memory.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.component.html',
  styleUrls: ['./add-memory.component.less'],
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class AddMemoryComponent {
  constructor(
    private apiService: AddMemoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  private fb = inject(FormBuilder);
  memoryForm = this.fb.group({
    memory: ['', Validators.required],
  });
  hasUnitNumber = false;

  onSubmit(): void {
    if (this.memoryForm.valid) {
      const memory = this.memoryForm.get('memory')?.value;
      if (memory) {
        this.apiService.addMemory(memory).subscribe(() => {
          this.router.navigate(['./../'], {
            relativeTo: this.activatedRoute,
          });
        });
      }
    }
  }
}
