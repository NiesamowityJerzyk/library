import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { email } from 'src/app/utils/validators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  public isSubmitting = false;
  public showPasswordScreen = false;
  public form: UntypedFormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.maxLength(256), email]],
    password: [
      null,
      [Validators.required, Validators.maxLength(64), Validators.minLength(8)],
    ],
  });
  public checkboxForm: UntypedFormGroup = this.fb.group({
    isRemember: [false],
  });

  constructor(private fb: UntypedFormBuilder) {}
}
