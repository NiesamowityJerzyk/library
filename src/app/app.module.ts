import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouter } from './app-router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainInterceptor } from './core/interceptors/main.interceptor';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { AuthState } from './modules/auth/store/state';
import { environment } from 'src/environments/environment';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRouter,
    FormsModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(),
    HotToastModule.forRoot({
      position: 'bottom-center',
    }),
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production,
    }),
    NgxsResetPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
