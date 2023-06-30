import { Component, Inject } from '@angular/core';
import { AdminService } from '../../store/service';
import { IUser } from '../../store/types';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AddUserDialogComponent } from '../../components/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../../components/edit-user-dialog/edit-user-dialog.component';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  public isLoading = false;
  public users!: IUser[];
  public email!: any;
  private subscription$: Subscription = new Subscription();
  public formSearch: UntypedFormGroup = this.fb.group({
    search: '',
  });

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit() {
    this.getUsers();

    this.subscription$.add(
      this.formSearch
        .get('search')
        ?.valueChanges.pipe(distinctUntilChanged(), debounceTime(300))
        .subscribe((val) => {
          this.getUsers(val);
        })
    );
  }

  private getUsers(name?: string): void {
    this.adminService.getUsers(name).subscribe((val) => {
      this.users = val as any;
    });
  }

  openDialogUpdate(user: IUser): void {
    let updateData = user;

    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: updateData,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log({
          userID: user.userID,
          ...result,
        });
        this.updateUser({
          userID: user.userID,
          ...result,
        });
      }
    });
  }

  public openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  private updateUser(data: IUser): void {
    this.adminService.updateUser(data).subscribe((val) => {
      this.toast.success('User successfully updated');
      this.getUsers();
    });
  }

  private addUser(data: IUser): void {
    this.adminService.addUser(data).subscribe((val) => {
      this.toast.success('User successfully added');
      this.getUsers();
    });
  }

  public removeUser(id: number) {
    this.adminService.removeUser(id).subscribe((val) => {
      this.toast.success('User successfully removed');
      this.getUsers();
    });
  }
}
