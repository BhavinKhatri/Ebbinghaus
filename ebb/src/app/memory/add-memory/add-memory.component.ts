import { Component, inject } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AddMemoryService } from './add-memory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddMemoryBusiness } from 'src/app/business/memory/add-memory';
import { IAddMemoryBusiness } from 'src/app/business/shared/interfaces/add-memory/add-memory-business';
import { MemoryCardComponent } from '../shared/memory-card.component';
import { RectrixAngularValidatorMapperPipe } from 'src/app/shared/rectrix-angular-validator-mapper.pipe';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.component.html',
  styleUrls: ['./add-memory.component.less'],
  standalone: true,
  imports: [MemoryCardComponent],
  providers: [RectrixAngularValidatorMapperPipe],
})
export class AddMemoryComponent implements IAddMemoryBusiness {
  private fb = inject(FormBuilder);
  private validationMapper = inject(RectrixAngularValidatorMapperPipe);

  constructor(
    private apiService: AddMemoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get isFormValid() {
    return this.memoryForm.valid;
  }

  get memoryData() {
    return this.memoryForm.get(this.mfc.controlName)?.value;
  }

  saveMemory(memory: string) {
    this.apiService.addMemory(memory).subscribe(() => {
      this.redirectAfterSave();
    });
  }

  redirectAfterSave() {
    this.router.navigate(['./../'], {
      relativeTo: this.activatedRoute,
    });
  }
  amb = new AddMemoryBusiness();
  mfc = this.amb.memoryFormControl;
  memoryForm = this.fb.group({
    [this.mfc.controlName]: [
      this.mfc.controlValue,
      this.validationMapper.transform(this.mfc.validators),
    ],
  });
  hasUnitNumber = false;

  onSubmit(): void {
    this.amb.submitMemory(this);
  }
}
