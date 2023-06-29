import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AppMaterialModule } from '../app.material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonComponent } from './components/button/button.component';
import { PopoverComponent } from './components/popover/popover.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { PublisherCardComponent } from './components/publisher-card/publisher-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './components/icon/icon.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { BorrowCardComponent } from './components/borrow-card/borrow-card.component';
import { BookingsComponent } from '../modules/user/pages/bookings/bookings.component';
import { BookingCardComponent } from './components/booking-card/booking-card.component';
// import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent,
    PopoverComponent,
    BookCardComponent,
    PublisherCardComponent,
    FooterComponent,
    IconComponent,
    AuthorCardComponent,
    BorrowCardComponent,
    BookingCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    PortalModule,
    FontAwesomeModule,
    // NgxLoaderIndicatorModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    ButtonComponent,
    PopoverComponent,
    BookCardComponent,
    PublisherCardComponent,
    FooterComponent,
    FontAwesomeModule,
    IconComponent,
    AuthorCardComponent,
    BorrowCardComponent,
    BookingCardComponent,
    // NgxLoaderIndicatorModule,
  ],
})
export class SharedModule {}
