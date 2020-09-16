import { AbstractControl } from "@angular/forms";

export function cityValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  return { cityNotFound: true };
}
