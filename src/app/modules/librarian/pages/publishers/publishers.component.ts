import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibrarianService } from '../../store/service';
import { IBook, IPublisher } from '../../store/types';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss'],
})
export class PublishersComponent {
  public publishers!: IPublisher[];
  constructor(
    public router: Router,
    private librarianService: LibrarianService
  ) {}

  ngOnInit() {
    console.log('elo');

    this.librarianService.getPublishers().subscribe((val) => {
      console.log(val);
      this.publishers = val;
    });
  }
}
