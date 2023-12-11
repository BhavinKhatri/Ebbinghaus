import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './memory-card.component.html',
  styleUrl: './memory-card.component.scss',
})
export class MemoryCardComponent {
  @Input() title!: string;
  @Input() memoryForm!: FormGroup;
  @Input() saveBtnText!: string;
  @Output() save: EventEmitter<void> = new EventEmitter();
  onSubmit(): void {
    this.save.emit();
  }
}
