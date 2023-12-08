import { ValidationType } from '../enums/validation-type';

export interface IRectrixValidator {
  type: ValidationType;
  message: string;
}
