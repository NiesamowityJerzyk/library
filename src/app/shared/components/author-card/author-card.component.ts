import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { IUser, UserRolesEnum } from 'src/app/modules/auth/store/types';
import { IAuthor, IBook } from 'src/app/modules/librarian/store/types';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
})
export class AuthorCardComponent {
  @Input() public author!: IAuthor;
  @Output() public edit: EventEmitter<number> = new EventEmitter();
  @Output() public remove: EventEmitter<void> = new EventEmitter();

  public role!: string;
  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.role = UserRolesEnum[this.tokenService.getRole() as any];
  }
}
