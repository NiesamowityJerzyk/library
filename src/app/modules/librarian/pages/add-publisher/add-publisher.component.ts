import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConstsService } from 'src/app/core/services/const.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.scss'],
})
export class AddPublisherComponent {
  public form: UntypedFormGroup = this.fb.group({
    publisherName: ['', [Validators.required, Validators.maxLength(256)]],
  });
  constructor(
    public router: Router,
    private librarianService: LibrarianService,
    private fb: UntypedFormBuilder,
    public constsService: ConstsService,
    private toast: HotToastService
  ) {}

  ngOnInit() {}

  public addPublisher(): void {
    this.librarianService.addPublisher(this.form.value).subscribe((val) => {
      this.toast.success('Pomyślnie dodano wydawnictwo');
      this.router.navigate(['/librarian/publishers']);
    });
  }
}
