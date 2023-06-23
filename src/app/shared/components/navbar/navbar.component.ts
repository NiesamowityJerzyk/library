import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/store/service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() public text!: string;
  public role: 'admin' | 'user' = 'admin';
  public popoverOpen = false;
  constructor(private authService: AuthService) {}

  public togglePopover(): void {
    this.popoverOpen = !this.popoverOpen;
  }

  public logout(): void {
    this.authService.logout();
  }
}
