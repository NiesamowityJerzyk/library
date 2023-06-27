import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IBook, IPublisher } from '../../store/types';

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
})
export class BorrowsComponent {
  public borrows!: any[];
  constructor(
    public router: Router,
    private librarianService: LibrarianService
  ) {}

  ngOnInit() {
    // this.librarianService.getBorrows().subscribe((val) => {
    //   console.log(val);
    //   this.borrows = val;
    // });
  }
}
