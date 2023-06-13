import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function email(AC: AbstractControl): ValidationErrors | null {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return AC.value && !regex.test(AC.value) ? { email: true } : null;
}

export function phoneNumber(AC: AbstractControl): ValidationErrors | null {
  const regex = /^\+?[0-9]+([\s\-]?[0-9]+){7,}$/gm;
  return AC.value && !regex.test(AC.value) ? { phoneNumber: true } : null;
}

export function date(AC: AbstractControl): ValidationErrors | null {
  return AC.value != null && !(AC.value instanceof Date)
    ? { date: true }
    : null;
}

export function matchPassword(AC: AbstractControl): ValidationErrors | null {
  const password = AC.get('password')?.value;
  const confirmPassword = AC.get('confirmPassword')?.value;
  if (password && confirmPassword) {
    AC.get('confirmPassword')?.setErrors(
      password !== confirmPassword ? { matchPassword: true } : null
    );
  }
  return null;
}

export function validURL(AC: AbstractControl) {
  const regex = /(^|\s)((https?:\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  return AC.value && !regex.test(AC.value) ? { validURL: true } : null;
}

export function validColor(AC: AbstractControl) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbaRegex =
    /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
  return AC.value && !hexRegex.test(AC.value) && !rgbaRegex.test(AC.value)
    ? { validColor: true }
    : null;
}

export function noWhitespace(AC: AbstractControl): ValidationErrors | null {
  if (AC.value && AC.value.match(/\s+/g)) {
    return { whiteSpace: true };
  }

  return null;
}

export const combinedLengthValidator =
  (maxLength: number, fields: string[]) =>
  (control: AbstractControl): ValidationErrors | null => {
    const length = getCombinedLength(control, fields);
    if (length > maxLength) {
      return { combinedLength: { maxLength } };
    }
    return null;
  };

export const getCombinedLength = (control: AbstractControl, fields: string[]) =>
  fields
    .map((f) => control.get(f)?.value?.length || 0)
    .reduce((a, b) => a + b, 0);

export function letters(AC: AbstractControl): ValidationErrors | null {
  const hasUpper = /[A-Z]/.test(AC.value);
  const hasLower = /[a-z]/.test(AC.value);

  if (AC.value) {
    if (!hasUpper || !hasLower) {
      return { letters: true };
    }
  }

  return null;
}
