import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  exports: [MatIconModule, MatSliderModule],
})
export class AppMaterialModule {}
