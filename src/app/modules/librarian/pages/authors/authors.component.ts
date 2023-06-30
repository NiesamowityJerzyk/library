import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IBook, IPublisher } from '../../store/types';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
})
export class authorsComponent {
  public authors!: any[];
  constructor(
    public router: Router,
    private librarianService: LibrarianService
  ) {}

  ngOnInit() {
    this.librarianService.getAuthors().subscribe((val) => {
      this.authors = val;
    });
  }
}
