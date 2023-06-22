import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRouter } from './admin.router';

@NgModule({
  declarations: [AdminComponent, UsersComponent],
  imports: [CommonModule, SharedModule, AdminRouter],
})
export class AdminModule {}
