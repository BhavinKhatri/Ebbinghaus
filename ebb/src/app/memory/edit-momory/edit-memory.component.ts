import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditMemoryService } from './edit-memory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEditMemoryBusiness } from 'src/app/business/shared/interfaces/edit-memory/edit-memory-business';
import { EditMemoryBusiness } from 'src/app/business/memory/edit-memory';
import { RectrixAngularValidatorMapperPipe } from 'src/app/shared/rectrix-angular-validator-mapper.pipe';
import { MemoryCardComponent } from '../shared/memory-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-memory',
  standalone: true,
  imports: [CommonModule, MemoryCardComponent],
  providers: [RectrixAngularValidatorMapperPipe],
  templateUrl: './edit-memory.component.html',
  styleUrl: './edit-memory.component.scss',
})
export class EditMemoryComponent
  implements IEditMemoryBusiness, OnInit, OnDestroy
{
  private fb = inject(FormBuilder);
  private validationMapper = inject(RectrixAngularValidatorMapperPipe);
  private subscription!: Subscription;
  constructor(
    private apiService: EditMemoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.memoryId = param['id'];
      this.subscription = this.apiService
        .getMemoryById(this.memoryId)
        .subscribe((memory) => {
          this.memoryForm.patchValue({
            [this.emb.memoryFormControl.controlName]: memory.memory,
          });
        });
    });
  }
  emb = new EditMemoryBusiness();
  mfc = this.emb.memoryFormControl;
  memoryForm: FormGroup = this.fb.group({
    [this.mfc.controlName]: [
      this.mfc.controlValue,
      this.validationMapper.transform(this.mfc.validators),
    ],
  });

  memoryId!: string;

  get isFormValid() {
    return this.memoryForm.valid;
  }
  get memoryData() {
    return this.memoryForm.get(this.mfc.controlName)?.value;
  }
  saveMemory(memory: string) {
    this.apiService.editMemory(memory, this.memoryId).subscribe(() => {
      this.redirectAfterSave();
    });
  }
  redirectAfterSave() {
    this.router.navigate(['./../../'], {
      relativeTo: this.activatedRoute,
    });
  }

  onSubmit(): void {
    this.emb.submitMemory(this);
  }
}
