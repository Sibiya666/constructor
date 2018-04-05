import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PopupComponent, PopupService} from './popup';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule
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
