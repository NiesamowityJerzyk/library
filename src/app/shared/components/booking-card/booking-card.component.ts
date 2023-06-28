import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { IUser, UserRolesEnum } from 'src/app/modules/auth/store/types';
import { IBook } from 'src/app/modules/librarian/store/types';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
})
export class BookingCardComponent {
  @Input() public booking!: any;
  @Output() public bookClicked: EventEmitter<void> = new EventEmitter();
  @Output() public remove: EventEmitter<void> = new EventEmitter();

  public role!: string;
  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.role = UserRolesEnum[this.tokenService.getRole() as any];
  }
}
