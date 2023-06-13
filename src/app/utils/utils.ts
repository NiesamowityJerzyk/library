import { UntypedFormGroup } from '@angular/forms';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRouteSnapshot, Data } from '@angular/router';

export const uniqueID = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const prepareParams = (
  params: Record<string, any> | undefined
): Record<string, any> => {
  const response: Record<string, any> = {};
  if (params) {
    Object.keys(params).forEach((key: string) => {
      if (
        params[key] !== '' &&
        params[key] !== null &&
        params[key] !== undefined
      ) {
        response[key] = params[key];
      }
    });
  }
  return response;
};
