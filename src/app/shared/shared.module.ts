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
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    PortalModule,
    FontAwesomeModule,
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
  ],
})
export class SharedModule {}
