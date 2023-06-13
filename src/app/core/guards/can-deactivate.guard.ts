import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm.dialog';
import { IHasUnsavedData } from '../../shared/has-unsaved-data.interface';
import { TemplatesService } from 'src/app/modules/admin/store/templates/templates.service';

@Injectable()
export class HasUnsavedDataGuard implements CanDeactivate<IHasUnsavedData> {
  constructor(public dialog: MatDialog, private templatesService: TemplatesService) {}

  public canDeactivate(component: any, currentRoute: any, currentState: any, nextState: any): Observable<boolean> {
    if (component.isChanged && !nextState.url.includes('/ai-generate')) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);

      return dialogRef.afterClosed().pipe(
        map((result) => {
          if (result) {
            return true;
          } else {
            return false;
          }
        }),
      );
    } else {
      return of(true);
    }
  }
}
