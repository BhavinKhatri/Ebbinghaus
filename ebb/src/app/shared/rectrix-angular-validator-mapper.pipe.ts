import { Pipe, PipeTransform } from '@angular/core';
import { ValidationType } from '../business/shared/enums/validation-type';
import { IRectrixValidator } from '../business/shared/interfaces';
import { Validators } from '@angular/forms';

@Pipe({
  name: 'rectrixAngularValidatorMapper',
  standalone: true,
})
export class RectrixAngularValidatorMapperPipe implements PipeTransform {
  transform(value: IRectrixValidator[]): Validators[] {
    const result: Validators[] = [];
    value.forEach((v) => {
      if (v.type === ValidationType.REQUIRED) {
        result.push(Validators.required);
      }
    });
    return result;
  }
}
