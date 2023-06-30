import { Component, Inject } from '@angular/core';
import { AdminService } from '../../store/service';
import { IUser } from '../../store/types';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AddUserDialogComponent } from '../../components/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../../components/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  public isLoading = false;
  public users!: IUser[];
  public email!: any;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): void {
    this.adminService.getUsers().subscribe((val) => {
      this.users = val;
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
