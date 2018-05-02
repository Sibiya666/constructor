import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CardComponent , CardOptionsComponent } from './card';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollBarComponent } from './scroll-bar';
import { PopupComponent, PopupService} from './popup';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardOptionsComponent,
    HeaderComponent,
    FooterComponent,
    PopupComponent,
    ScrollBarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    PopupService,
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupComponent
  ]
})
export class AppModule { }
